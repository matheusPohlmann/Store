using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Store.Application.Contratos;
using Store.Domain;
using Store.Persistence;

namespace Store.Application
{
    public class ProdutoService : IProdutoService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IProdutoPersist _produtoPersist;

        public ProdutoService(IGeralPersist geralPersist, IProdutoPersist produtoPersist)
        {
            _geralPersist = geralPersist;
            _produtoPersist = produtoPersist;
        }
        public async Task<Produto> AddProdutos(Produto model)
        {
            try
            {
                _geralPersist.Add<Produto>(model);
                if (await _geralPersist.SaveChangesAsync())
                {
                    return await _produtoPersist.GetProdutosById(model.Id);
                }
                return null;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<Produto> UpdateProdutos(int ProdutoId, Produto model)
        {
            try
            {
                var produto = await _produtoPersist.GetProdutosById(ProdutoId);
                if (produto == null) return null;

                model.Id = produto.Id;

                _geralPersist.Update(model);
                if (await _geralPersist.SaveChangesAsync())
                {
                    return await _produtoPersist.GetProdutosById(model.Id);
                }
                return null;
            }
            catch (Exception e)
            {

                throw e;
            }
        }
        public async Task<bool> DeleteProdutos(int ProdutoId)
        {
            try
            {
                var produto = await _produtoPersist.GetProdutosById(ProdutoId);
                if (produto == null) throw new Exception("O produto não existe.");

                _geralPersist.Delete<Produto>(produto);
                return await _geralPersist.SaveChangesAsync();
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public async Task<Produto[]> GetAllProdutos()
        {
            try
            {
                var produtos = await _produtoPersist.GetAllProdutos();
                if (produtos == null) return null;

                return produtos;
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public async Task<Produto> GetProdutosById(int produtoId)
        {
            try
            {
                var produtos = await _produtoPersist.GetProdutosById(produtoId);
                if (produtos == null) return null;

                return produtos;
            }
            catch (Exception e)
            {

                throw e;
            }
        }
    }
}