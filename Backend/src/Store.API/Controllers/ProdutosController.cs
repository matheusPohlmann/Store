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
using Store.Application.Dtos;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace Store.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutosController : ControllerBase
    {
        private readonly IProdutoService _produtoService;
        private readonly IParamService _paramService;
        private readonly IWebHostEnvironment _hostEnvironment;

        private readonly string _destino = "Images";

        public ProdutosController(IProdutoService produtoService, IParamService paramService, IWebHostEnvironment hostEnvironment)
        {
            _produtoService = produtoService;
            _paramService = paramService;
            _hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var produtos = await _produtoService.GetAllProdutos();
                if (produtos == null) return NotFound("Nenhum produto encontrado!");

                var ProdutoRetorno = new List<ProdutoDto>();

                var par = await _paramService.GetAll(1);
                double RateioDespesas = par.DespesasTotais / produtos.Length;
                foreach (var prod in produtos)
                {
                    double valvenda = ((prod.Price + RateioDespesas) * (1 + (par.MargemLucroPrcnt / 100)));

                    ProdutoRetorno.Add(new ProdutoDto()
                    {
                        Id = prod.Id,
                        Name = prod.Name,
                        Price = prod.Price,
                        FinalPrice = valvenda,
                        Description = prod.Description,
                        ImageURL = prod.ImageURL,
                    });
                }

                return Ok(ProdutoRetorno);
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

        [HttpPost("upload-image/{produtoId}")]
        public async Task<IActionResult> UploadImage(int produtoId)
        {
            try
            {
                var produto = await _produtoService.GetProdutosById(produtoId);
                if (produto == null) return NoContent();

                var file = Request.Form.Files[0];
                if (file.Length > 0)
                {
                    DeleteImage(produto.ImageURL, _destino);
                    produto.ImageURL = await SaveImage(file, _destino);
                }
                var ProdutoRetorno = await _produtoService.UpdateProdutos(produtoId, produto);

                return Ok(ProdutoRetorno);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar realizar upload de foto do evento. Erro: {ex.Message}");
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
                    Ok(new { message = "Deletado" }) :
                    BadRequest("Produto não deletado");
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar remover produtos. Erro: {e.Message}");
            }
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile, string _destino)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName)
                                            .Take(10)
                                            .ToArray()
                                            ).Replace(' ', '-');

            imageName = $"{imageName}{DateTime.UtcNow.ToString("yymmssfff")}{Path.GetExtension(imageFile.FileName)}";

            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, @"Resources/images", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            return "";
        }

        [NonAction]
        public void DeleteImage(string imageName, string _destino)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, @"Resources/images", imageName);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }

    }
}
