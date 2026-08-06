using Microsoft.EntityFrameworkCore;
using ProductInventory.Api.Data;
using ProductInventory.Api.DTOs;
using ProductInventory.Api.Entities;

namespace ProductInventory.Api.Services;

public class CategoryService(AppDbContext db) : ICategoryService
{
    public async Task<List<CategoryReadDto>> GetAllAsync()
    {
        return await db.Categories
            .OrderBy(c => c.Name)
            .Select(c => new CategoryReadDto(c.Id, c.Name, c.Description))
            .ToListAsync();
    }

    public async Task<CategoryReadDto> CreateAsync(CategoryCreateDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Name))
            throw new ArgumentException("Name is required.");

        var category = new Category
        {
            Name = dto.Name.Trim(),
            Description = dto.Description
        };

        db.Categories.Add(category);
        await db.SaveChangesAsync();

        return new CategoryReadDto(category.Id, category.Name, category.Description);
    }
}
