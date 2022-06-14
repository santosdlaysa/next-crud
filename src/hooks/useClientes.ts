import { useEffect, useState } from "react"
import ColecaoCliente from "../backend/db/colecaoCliente"
import Cliente from "../core/Cliente"
import ClienteRepositorio from "../core/ClienteRepositorio"
import useTabelaOuForm from "./useTabelaOuForm"

export default function useClientes(){
    const repo: ClienteRepositorio = new ColecaoCliente()

    const { tabelaVisivel, formularioVisivel, exibirTabela, exibirFormulario } = useTabelaOuForm
    const[cliente, setCliente] = useState<Cliente>(Cliente.vazio())
    const[clientes, setClientes] = useState<Cliente[]>([])
  
    useEffect(obterTodos, [])
  
    function obterTodos(){
      repo.obterTodos().then(clientes => {
        setClientes(clientes)
        exibirTabela
      }) //retornar uma promessa quando receber todos os clientes
  
    }
  
  function clienteSelecionado(cliente: Cliente){
    setCliente(cliente)
      exibirFormulario()
  }
  
  async function clienteExcluido(cliente: Cliente){
    await repo.excluir(cliente)
    obterTodos()
  }
  
  function novoCliente(){
    setCliente(Cliente.vazio())
    exibirFormulario()
  }
  async function salvarCliente(cliente: Cliente) {
    await repo.salvar(cliente)
    obterTodos()
  }

  return {
    cliente,
    clientes,
    novoCliente,
    salvarCliente,
    excluirCliente,
    selecionarCliente,
    obterTodos,
    tabelaVisivel,
    exibirTabela,
  }
}