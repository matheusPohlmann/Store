using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Store.Domain;

namespace Store.Application.Contratos
{
    public interface IProdutoService
    {
        Task<Produto> AddProdutos(Produto model);
        Task<Produto> UpdateProdutos(int ProdutoId, Produto model);
        Task<bool> DeleteProdutos(int ProdutoId);
        Task<Produto[]> GetAllProdutos();
        Task<Produto> GetProdutosById(int produtoId);
    }
}