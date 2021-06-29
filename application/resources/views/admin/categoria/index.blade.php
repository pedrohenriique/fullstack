@extends('layouts.sistema')
@section('title','Categoria')
@section('content_header', 'Categoria')
@section('content')
    <categorias></categorias>
@stop
@push('js')
    <script src="{{mix('/js/admin/categorias/app.js')}}"></script>
@endpush
