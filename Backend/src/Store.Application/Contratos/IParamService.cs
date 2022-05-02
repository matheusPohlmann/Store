using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Store.Domain;

namespace Store.Application.Contratos
{
    public interface IParamService
    {
        Task<Param> Update(int ParamId, Param model);
        Task<Param> GetAll(int paramId);
    }
}