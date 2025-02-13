package ProIntermodular.demo.controller;

import ProIntermodular.demo.model.Usuarios;
import ProIntermodular.demo.service.UsuariosService;
import jakarta.servlet.http.HttpSession;
import ProIntermodular.demo.model.ShoppingList;
import ProIntermodular.demo.service.ShoppingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;

// Indica que esta clase es un controlador en Spring MVC
@Controller
// Define la ruta base para todas las solicitudes a este controlador
@RequestMapping("/api/lists")
public class ShoppingListController {
    // Inyección de dependencias: Spring gestionará el servicio automáticamente
    @Autowired
    private ShoppingListService service;
    @Autowired
    private UsuariosService userService;

    @GetMapping()
    public CompletableFuture<String> getAllLists(HttpSession session, Model model){
        // Obtiene todas las listas de compras desde el servicio de forma asincrona
        Integer usuarioId = (Integer) session.getAttribute("usuarioId");
        return service.findAll(usuarioId).thenApply(datos -> {
            model.addAttribute("listasCompra", datos);
            return "fragments/listasCompra";
        });
    }

//    @GetMapping()
//    public String getUserLists(Model model, HttpSession session) {
//        // Obtener el ID del usuario que ha iniciado sesión
//        Integer usuarioId = (Integer) session.getAttribute("usuarioId");
//
//        if (usuarioId == null) {
//            return "login"; // Si no hay usuario, redirigir al login
//        }
//
//        // Obtener las listas de compras del usuario
////        List<ShoppingList> listasDelUsuario = service.findByUsuario(usuarioId);
////
////        // Pasar las listas a la vista
////        model.addAttribute("listasCompra", listasDelUsuario);
//        return "listasCompra";
//    }



    @GetMapping("nuevaLista")
    public String showNuevaLista()
    {
        return "fragments/NuevaLista";
    }

    @GetMapping("detallesLista")
    public String showDetalleLista(@RequestParam Long id,Model model)
    {
        //1 capturar el id de la lista que quiero mostrar

        //2 consultar a BD la lista que quiero consultar
        var objetoLista = service.getById(id);

        //3 cargar tambien los productos de la lista
        if(objetoLista.isPresent())
        {
            model.addAttribute("listaCompra", objetoLista.get());
        }
        return "fragments/detallesLista";
        //4 con todo el objeto lista de compra relleno lo mandamos a la vista Detalle
    }


    // Maneja las solicitudes POST para crear una nueva lista de compras
    @PostMapping("/save")
    public ResponseEntity<?> createList(@RequestBody ShoppingList shoppingList, HttpSession session){
        //obtenemos el id usuario logueado para grabar la lista de compra
        Integer usuarioId = (Integer) session.getAttribute("usuarioId");
        //antes de grabarlo en base de datos modificamos el modelo de lista de compra y le añadimos el idusuario
        if(usuarioId != 0)
        {
            var user = userService.getById(usuarioId);
            if(user.isPresent())
            {
                shoppingList.setUsuario(user.get());
                // Llama al servicio para guardar la nueva lista de compras
                var shoppingListGuardada = service.guardar(shoppingList);

                if(shoppingListGuardada != null)
                {
                    return ResponseEntity.ok().body("ok");
                }
            }
        }
        return ResponseEntity.badRequest().body("ko");
    }



}
