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
    public String getAllLists(Model model){
        // Obtiene todas las listas de compras desde el servicio
        var datos = service.findAll();
        model.addAttribute("listasCompra",datos);
        return "fragments/listasCompra";
        //return datos != null ? ResponseEntity.ok().body(datos) : ResponseEntity.ok().body(datos);
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
        return "NuevaLista";
    }

    @GetMapping("detalleslista")
    public String showDetalleLista(int id)
    {
        //1 capturar el id de la lista que quiero mostrar

        //2 consultar a BD la lista que quiero consultar
        //objetoLista = servicio.consultarLista(3)

        //3 cargar tambien los productos de la lista

        //4 con todo el objeto lista de compra relleno lo mandamos a la vista Detalle

        return "DetallesLista";
    }
    // Maneja las solicitudes POST para crear una nueva lista de compras
    @PostMapping("/save")
    public ResponseEntity<?> createList(@RequestBody ShoppingList shoppingList, HttpSession session){
        //obtenemos el id usuario logueado para grabar la lista de compra
        Integer usuarioId = (Integer) session.getAttribute("usuarioId");
        //antes de grabarlo en base de datos modificamos el modelo de lista de compra y le añadimos el idusuario
        if(usuarioId != 0)
        {
            var loggedUser = userService.getById(usuarioId);
            if(!loggedUser.isPresent())
            {
                shoppingList.setUsuario(loggedUser.get());
            }
        }

        // Llama al servicio para guardar la nueva lista de compras
        var shoppingListGuardada = service.guardar(shoppingList);

        if(shoppingListGuardada != null)
        {
            return ResponseEntity.ok().body("Ok todo");
        }
        else
        {
            return ResponseEntity.badRequest().body("Datos inválidos");
        }
    }



}