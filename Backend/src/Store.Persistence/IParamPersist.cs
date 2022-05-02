using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Store.Domain;

namespace Store.Persistence
{
    public interface IParamPersist
    {
        Task<Param> GetAll(int ParamId);
    }
}