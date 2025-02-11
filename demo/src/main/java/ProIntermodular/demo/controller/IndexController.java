package ProIntermodular.demo.controller;

import ProIntermodular.demo.service.UsuariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class IndexController {

    @Autowired
    private UsuariosService usuariosService;

    @GetMapping("/index")
    public String showAppPage() {
        return "index";
    }
}

