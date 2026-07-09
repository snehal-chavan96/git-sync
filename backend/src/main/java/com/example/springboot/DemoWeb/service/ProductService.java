package com.example.springboot.DemoWeb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springboot.DemoWeb.repository.ProductRepo;

@Service
public class ProductService {

    // List<Product> products = new ArrayList<>(Arrays.asList(
    //     new Product(101,"Iphone",50000),
    //     new Product(102,"Canon Camera",70000)));

    @Autowired
    ProductRepo repo;
//
//    public List<Product> getProducts() {
//        return repo.findAll();
//    }
//
//    public Product getProductById(int id){
//        return repo.findById(id).orElse(null);
//    }

//    public Product addProduct(Product product, MultipartFile imageFile) throws IOException{
//       System.out.println(product);
//        product.setImageName(imageFile.getOriginalFilename());
//        product.setImageType(imageFile.getContentType());
//        product.setImageDate(imageFile.getBytes());
//        return repo.save(product);


//    }

    // public void updateProduct(Product prod) {
    //     repo.save(prod);
    // }

    
//    public Product updateProduct(Integer id, Product product, MultipartFile imageFile) throws IOException{
//        product.setImageDate((imageFile.getBytes()));
//        product.setImageName(imageFile.getOriginalFilename());
//        product.setImageType((imageFile.getContentType()));
//        return repo.save(product);
//
//    }

//    public void deleteProduct(int id) {
//        repo.deleteById(id);
//    }

//    public List<Product> searchProducts(String keyword) {
//        return repo.searchProducts(keyword);
//    }


}

