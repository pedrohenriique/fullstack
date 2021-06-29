@extends('layouts.sistema')
@section('title','Papéis')
@section('content_header', 'Papéis')
@section('content')
    <papeis></papeis>
@stop
@push('js')
    <script src="{{mix('/js/admin/papeis/app.js')}}"></script>
@endpush
