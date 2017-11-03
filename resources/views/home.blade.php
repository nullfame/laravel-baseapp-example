@extends('baseapp::app')

@section('title', 'Home')

@section('content')
    <h1>{{ Config::get('baseapp.appName') }}</h1>
    @if(Auth::user())
        <p>Hi, you are welcome here.</p>
    @else
        <p>Oops!  This is not a place to be</p>
    @endif
@stop
