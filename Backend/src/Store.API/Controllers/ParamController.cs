using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Store.Application.Contratos;
using Store.Domain;

namespace Store.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ParamController : ControllerBase
    {
        private readonly IParamService _paramService;

        public ParamController(IParamService paramService)
        {
            _paramService = paramService;
        }

        [HttpGet]
        public async Task<IActionResult> GetParams()
        {
            try
            {
                var produto = await _paramService.GetAll(1);
                if (produto == null) return NotFound("Nenhum parametro encontrado!");

                return Ok(produto);
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar parametros. Erro: {e.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Param model)
        {
            try
            {
                var produto = await _paramService.Update(id, model);
                if (produto == null) return BadRequest("Erro ao tentar atualizar parametro.");

                return Ok(produto);
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar parametros. Erro: {e.Message}");
            }
        }


    }
}