using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using System.Threading.Tasks;
using Store.Domain;
using Store.Application.Dtos;

namespace Store.Application.Helpers
{
    public class StoreProfile : Profile
    {
        public StoreProfile()
        {
            CreateMap<Produto, ProdutoDto>();
        }
    }
}