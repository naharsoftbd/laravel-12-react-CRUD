<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $users = User::query();

        if($request->filled('search')){
            $search = $request->search;
            $users->where(fn($query) =>
                $query->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                
        );
        }
        $users = $users->latest()->paginate(10)->withQueryString();
        $users->getCollection()->transform(fn($user)=>[
            'id' => $user->id,
            'name'=> $user->name,
            'email' => $user->email,
            'created_at' => $user->created_at->format('d M Y')
        ]);
        return Inertia::render('users/index',[
            'users' => $users,
            'filters' => $request->search
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('users/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        return redirect()->intended(route('users.index', absolute: false));
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
        return Inertia::render('users/edit',[
            'user' => User::find($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255',
        ]);

    if($request->password){
       $user = $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
    }else{

        $user = $user->update([
            'name' => $request->name,
            'email' => $request->email
        ]);

    }

        return redirect()->intended(route('users.index', absolute: false));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if($user){
            $user->delete();
        }

        return redirect()->intended(route('users.index', absolute: false));
    }
}
