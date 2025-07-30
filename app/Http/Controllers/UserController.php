<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Spatie\Permission\Models\Role;
use App\Services\UserService;

class UserController extends Controller
{
    public function __construct(
        protected UserService $userService
    ) {
    }

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
        $users = $users->latest()->with('roles')->paginate(10)->withQueryString();
        $users->getCollection()->transform(fn($user)=>[
            'id' => $user->id,
            'name'=> $user->name,
            'email' => $user->email,
            'roles' => $user->roles,
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
        return Inertia::render('users/create',[
            'roles' => Role::pluck('name')
        ]);
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

        $data = $request->only('name','email');

        $user = $this->userService->create($data, $request->password, $request->roles);

        event(new Registered($user));

        return redirect()->route('users.index')->with(['success' => 'User Created Successfully']);
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
        $user = $this->userService->find($id);
        return Inertia::render('users/edit',[
            'user' => $user,
            'userRoles' => $user->roles()->pluck('name'),
            'roles' => Role::all(),
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
       $userupdate = $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
    }else{

        $userupdate = $user->update([
            'name' => $request->name,
            'email' => $request->email
        ]);

    }

    $user->syncRoles($request->roles);

        return redirect()->route('users.index')->with(['success' => 'User Updated Successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user = $this->userService->delete($user->id);

        return redirect()->route('users.index')->with(['success' => 'User Deleted Successfully']);
    }
}
