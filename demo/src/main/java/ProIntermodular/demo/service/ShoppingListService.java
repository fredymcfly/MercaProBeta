package ProIntermodular.demo.service;
// Paquete que contiene la lógica del negocio o servicio
import ProIntermodular.demo.model.ShoppingList;
import ProIntermodular.demo.repository.IShoppingListRepository;
import ProIntermodular.demo.repository.IUsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import java.util.List;
// Indica que esta clase es un servicio gestionado por Spring
@Service
public class ShoppingListService {
    // Inyección de dependencias: el repositorio es gestionado automáticamente por Spring
    @Autowired
    private IShoppingListRepository repository;
    @Autowired
    private IUsuariosRepository userRepository;

    // Método que devuelve todas las listas de compras almacenadas en la base de datos
    @Async
    public CompletableFuture<List<ShoppingList>> findAll(int idUsuario){
        //este metodo devuelve todas las listas
        return CompletableFuture.supplyAsync(() -> {
            var usuario = userRepository.findById(idUsuario);
            if(usuario.isPresent())
            {
                return repository.findByUsuario(usuario.get());
            }
            else
            {
                return List.of();
            }
        });
    }

    public Optional<ShoppingList> getById(Long id)
    {
        return repository.findById(id);
    }

    /*public List<ShoppingList> findAll(){
        //este metodo devuelve todas las listas
        return repository.findAllByIdUsuario();
    }*/
    // Método que guarda una nueva lista de compras en la base de datos
    public ShoppingList guardar(ShoppingList shoppingList){
        return  repository.save(shoppingList);
    }

}
