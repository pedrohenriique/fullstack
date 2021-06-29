@extends('layouts.sistema')
@section('title','Produtos')
@section('content_header', 'Produtos')
@section('content')
    <produtos></produtos>
@stop
@push('js')
    <script src="{{mix('/js/admin/produtos/app.js')}}"></script>
@endpush
