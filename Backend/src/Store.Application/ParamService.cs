using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Store.Application.Contratos;
using Store.Domain;
using Store.Persistence;

namespace Store.Application
{
    public class ParamService : IParamService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IParamPersist _paramPersist;

        public ParamService(IGeralPersist geralPersist, IParamPersist paramPersist)
        {
            _geralPersist = geralPersist;
            _paramPersist = paramPersist;
        }

        public async Task<Param> GetAll(int paramId)
        {
            try
            {
                var parameters = await _paramPersist.GetAll(paramId);
                if (parameters == null) return null;

                return parameters;
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public async Task<Param> Update(int paramId, Param model)
        {
            try
            {
                var produto = await _paramPersist.GetAll(paramId);
                if (produto == null) return null;

                model.Id = produto.Id;

                _geralPersist.Update(model);
                if (await _geralPersist.SaveChangesAsync())
                {
                    return await _paramPersist.GetAll(paramId);
                }
                return null;
            }
            catch (Exception e)
            {

                throw e;
            }
        }
    }
}