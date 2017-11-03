@extends('baseapp::app')
@section('title', 'System Administation')

@section('content')
    <h1>System Administation</h1>
    <ul class="admin">
        @can('index', new WeinbergIT\BaseApp\Group)
            <li><a href="/groups">Groups</a></li>
        @endcan
        @can('index', new WeinbergIT\BaseApp\GroupType)
            <li><a href="/group_types">Group Types</a></li>
        @endcan
        @can('index', new WeinbergIT\BaseApp\SchemaTemplate)
            <li><a href="/schema_templates">Schemas</a></li>
        @endcan
        @can('index', new WeinbergIT\BaseApp\Tag)
            <li><a href="/tags">Tags</a></li>
        @endcan
        @can('index', new WeinbergIT\BaseApp\User)
            <li><a href="/users">Users</a></li>
        @endcan
    </ul>
@stop
