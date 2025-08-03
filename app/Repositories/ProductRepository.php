<?php

namespace App\Repositories;

use App\Interfaces\ProductRepositoryInterface;
use App\Models\Product;
use App\Models\Service;


class ProductRepository implements ProductRepositoryInterface
{
    public function all(): \Illuminate\Database\Eloquent\Collection
    {
        return Product::all();
    }

    public function create(array $data): ?Product
    {
        $featuredimage = null;
        if($data['featuredimage']){
            $featuredimage = $data['featuredimage'];
            $featuredimageOriginalName = $featuredimage->getClientOriginalName();
            $featuredimage = 'storage/'.$featuredimage->store('products','public');
        }
        $product = Product::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'price' => $data['price'],
            'featured_image' => $featuredimage
        ]);

        foreach($data['services'] as $service){

            $services = Service::create([
                'name' => $service,
                'product_id' => $product->id
            ]);

        }
        
        

        return $product;
    }

    public function update(array $data, int $id): int
    {
        $product = Product::findOrFail($id);

        if($product){
            $product->name = $data['name'];
            $product->price = $data['price'];
            $product->description = $data['description'];

            if($data['featuredimage']){
            $featuredimage = $data['featuredimage'];
            $featuredimageOriginalName = $featuredimage->getClientOriginalName();
            $featuredimage = 'storage/'.$featuredimage->store('products','public');
            $product->featured_image = $featuredimage;
            }
        }
        $product->save();    

        return $id;
    
    }

    public function delete(int $id): bool
    {
        $product = Product::findOrFail($id);

        return $product->delete();
    }

    public function find(int $id): ?Product
    {
        return Product::find($id);
    }
}