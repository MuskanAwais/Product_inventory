using ProductInventory.Api.DTOs;

namespace ProductInventory.Api.Services;

public interface IProductService
{
    Task<List<ProductReadDto>> GetAllAsync(string? search);
    Task<ProductReadDto?> GetByIdAsync(int id);
    Task<ProductReadDto> CreateAsync(ProductCreateDto dto);
    Task<ProductReadDto?> UpdateAsync(int id, ProductUpdateDto dto);
    Task<bool> DeleteAsync(int id);
}
