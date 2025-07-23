<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\CreateProductRequest;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        
        $products = Product::query();

        if($request->filled('search')){
            $search = $request->search;
            $products->where(fn($query) =>
                $query->where('name', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%")
                ->orWhere('price', 'like', "{$search}")
        );
        }
        $products = $products->latest()->paginate(10)->withQueryString();
        $products->getCollection()->transform(fn($product)=>[
            'id' => $product->id,
            'name'=> $product->name,
            'price' => $product->price,
            'description' => $product->description,
            'featured_image' => $product->featured_image,
            'created_at' => $product->created_at->format('d M Y')
        ]);
        return Inertia::render('products/index',[
            'products' => $products,
            'filters' => $request->search
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('products/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateProductRequest $request)
    {
    
        $featuredimage = null;
        if($request->file('featuredimage')){
            $featuredimage = $request->file('featuredimage');
            $featuredimageOriginalName = $featuredimage->getClientOriginalName();
            $featuredimage = 'storage/'.$featuredimage->store('products','public');
        }
        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'featured_image' => $featuredimage
        ]);

        if($product){
            return redirect()->route('products.index')->with('success','Product Created Successfully');
        }



    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $product = Product::find($id);
        return Inertia::render('products/edit',[
            'product' => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CreateProductRequest $request, Product $product)
    {

        if($product){
            $product->name = $request->name;
            $product->price = $request->price;
            $product->description = $request->description;

            if($request->file('featuredimage')){
            $featuredimage = $request->file('featuredimage');
            $featuredimageOriginalName = $featuredimage->getClientOriginalName();
            $featuredimage = 'storage/'.$featuredimage->store('products','public');
            $product->featured_image = $featuredimage;
        }
        $product->save();
        return redirect()->route('products.index')->with('success','Product updated successfully');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        
        if($product){
            $product->delete();
        }

            return redirect()->route('products.index')->with('success','Product deleted Successfully');
    }
}
