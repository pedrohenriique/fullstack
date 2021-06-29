@extends('layouts.sistema')
@section('title','Clientes')
@section('content_header', 'Clientes')
@section('content')
    <clientes></clientes>
@stop
@push('js')
    <script src="{{mix('/js/admin/clientes/app.js')}}"></script>
@endpush
