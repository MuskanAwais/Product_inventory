using ProductInventory.Api.DTOs;

namespace ProductInventory.Api.Services;

public interface ICategoryService
{
    Task<List<CategoryReadDto>> GetAllAsync();
    Task<CategoryReadDto> CreateAsync(CategoryCreateDto dto);
}
