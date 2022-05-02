using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Store.Domain;

namespace Store.Persistence
{
    public class ParamPersist : IParamPersist
    {
        private readonly StoreContext _context;

        public ParamPersist(StoreContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Param> GetAll(int ParamId)
        {
            IQueryable<Param> query = _context.Params;
            query = query.OrderBy(p => p.Id)
                         .Where(p => p.Id == ParamId);

            return await query.FirstOrDefaultAsync();
        }
    }
}