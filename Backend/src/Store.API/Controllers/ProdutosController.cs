using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Store.Persistence;
using Store.Domain;
using Store.Application.Contratos;
using Microsoft.AspNetCore.Http;

namespace Store.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutosController : ControllerBase
    {
        private readonly IProdutoService _produtoService;

        public ProdutosController(IProdutoService produtoService)
        {
            _produtoService = produtoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var produtos = await _produtoService.GetAllProdutos();
                if (produtos == null) return NotFound("Nenhum produto encontrado!");

                return Ok(produtos);
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar produtos. Erro: {e.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var produto = await _produtoService.GetProdutosById(id);
                if (produto == null) return NotFound("Nenhum produto encontrado!");

                return Ok(produto);
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar produtos. Erro: {e.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Produto model)
        {
            try
            {
                var produto = await _produtoService.AddProdutos(model);
                if (produto == null) return BadRequest("Erro ao tentar adicionar produto.");

                return Ok(produto);
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar produtos. Erro: {e.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Produto model)
        {
            try
            {
                var produto = await _produtoService.UpdateProdutos(id, model);
                if (produto == null) return BadRequest("Erro ao tentar atualizar produto.");

                return Ok(produto);
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar produtos. Erro: {e.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                return await _produtoService.DeleteProdutos(id) ?
                    Ok("Deletado") :
                    BadRequest("Produto não deletado");
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar remover produtos. Erro: {e.Message}");
            }
        }

    }
}
