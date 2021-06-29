@extends('layouts.sistema')
@section('title','Pedidos')
@section('content_header', 'Pedidos')
@section('content')
    <pedidos></pedidos>
@stop
@push('js')
    <script src="{{mix('/js/admin/pedidos/app.js')}}"></script>
@endpush
