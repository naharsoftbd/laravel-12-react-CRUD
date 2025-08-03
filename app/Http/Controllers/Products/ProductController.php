<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\CreateProductRequest;
use App\Models\Product;
use App\Services\ProductService;

class ProductController extends Controller
{
    public function __construct(protected ProductService $productService) 
    {
    }

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
        $products = $products->latest()->with('services')->paginate(10)->withQueryString();
        $products->getCollection()->transform(fn($product)=>[
            'id' => $product->id,
            'name'=> $product->name,
            'price' => $product->price,
            'description' => $product->description,
            'featured_image' => $product->featured_image,
            'services' => $product->services,
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
        $data = $request->validated();

        $product = $this->productService->create($data);

        if($product){
            return redirect()->route('products.index')->with(['success' => 'Product Created Successfully']);
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
        $product = $this->productService->find($id);
        return Inertia::render('products/edit',[
            'product' => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CreateProductRequest $request, string $id)
    {
        $data = $request->validated();
        $product = $this->productService->update($data, $id);

        return redirect()->route('products.index')->with(['success' => 'Product updated successfully']);
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = $this->productService->delete($id);

        return redirect()->route('products.index')->with(['success' => 'Product deleted Successfully']);
    }
}
