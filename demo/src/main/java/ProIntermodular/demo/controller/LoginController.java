package ProIntermodular.demo.controller;

import jakarta.servlet.http.HttpSession;
import ProIntermodular.demo.service.UsuariosService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class LoginController {
    // Inyección del servicio de usuarios para gestionar la autenticación
    @Autowired
    private UsuariosService usuariosService;

    // Método que maneja la solicitud GET a "/login" y muestra la página de inicio de sesión
    @GetMapping("/login")
    public String showLoginPage() {
        return "fragments/login";// Retorna el nombre de la vista "login"
    }


    // Método que maneja la solicitud POST a "/dologin" para procesar el inicio de sesión
    @PostMapping("/dologin")
    public String DoLogin(@RequestParam String email, @RequestParam String password, HttpSession session){
        // Llama al servicio de usuarios para verificar si existe un usuario con las credenciales proporcionadas
        var user = this.usuariosService.getByLogin(email, password);
        if(user != null)
        {

            // Guarda información del usuario en la sesión para mantenerlo autenticado
            session.setAttribute("usuarioId", user.getId());// Guarda el ID del usuario
            session.setAttribute("usuarioEmail", user.getEmail());// Guarda el email del usuario
            //ir a la vista de gestion listas de compra

            // Redirige a la vista principal después del inicio de sesión exitoso
            return "index";
        }
        else // Si el usuario no existe (credenciales incorrectas)
        {
            return "index";// Redirige a la página principal (puede mejorarse mostrando un mensaje de error)
        }
    }
}