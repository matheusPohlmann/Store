using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Store.Domain;

namespace Store.Persistence
{
    public class ProdutoPersist : IProdutoPersist
    {
        private readonly StoreContext _context;

        public ProdutoPersist(StoreContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Produto[]> GetAllProdutos()
        {
            IQueryable<Produto> query = _context.Produtos;

            query = query.OrderBy(p => p.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Produto> GetProdutosById(int ProdutoId)
        {
            IQueryable<Produto> query = _context.Produtos;
            query = query.OrderBy(p => p.Id)
                         .Where(p => p.Id == ProdutoId);

            return await query.FirstOrDefaultAsync();
        }
    }
}