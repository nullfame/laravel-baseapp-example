<ul class="primary">
    <li><a href="/">Home</a></li>
    @if( Auth::user()->groups()->count() > 0)
        <li><a href="#">More Stuff</a></li>
    @endif
</ul>
@if( Auth::user()->admin )
    <ul class="admin">
        <li><a href="/admin">System Administration</a></li>
    </ul>
@endif

<ul class="logout">
    <li><a href="/logout" onclick="return confirm('Are you sure you want to log out?');">Logout</a></li>
</ul>