@extends('layouts.sistema')
@section('title','Usuarios')
@section('content_header', 'Usuarios')
@section('content')
    <usuarios></usuarios>
@stop
@push('js')
    <script src="{{mix('/js/admin/usuarios/app.js')}}"></script>
@endpush
