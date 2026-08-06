using Microsoft.EntityFrameworkCore;
using ProductInventory.Api.Data;
using ProductInventory.Api.DTOs;
using ProductInventory.Api.Entities;

namespace ProductInventory.Api.Services;

public class ProductService(AppDbContext db) : IProductService
{
    public async Task<List<ProductReadDto>> GetAllAsync(string? search)
    {
        var query = db.Products.Include(p => p.Category).AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(p => p.Name.Contains(search));

        return await query
            .OrderByDescending(p => p.CreatedAt)
            .Select(p => new ProductReadDto(
                p.Id,
                p.Name,
                p.Description,
                p.Price,
                p.Quantity,
                p.CategoryId,
                p.Category!.Name,
                p.CreatedAt))
            .ToListAsync();
    }

    public async Task<ProductReadDto?> GetByIdAsync(int id)
    {
        return await db.Products
            .Include(p => p.Category)
            .Where(p => p.Id == id)
            .Select(p => new ProductReadDto(
                p.Id,
                p.Name,
                p.Description,
                p.Price,
                p.Quantity,
                p.CategoryId,
                p.Category!.Name,
                p.CreatedAt))
            .FirstOrDefaultAsync();
    }

    public async Task<ProductReadDto> CreateAsync(ProductCreateDto dto)
    {
        Validate(dto.Name, dto.Price, dto.Quantity);

        var categoryExists = await db.Categories.AnyAsync(c => c.Id == dto.CategoryId);
        if (!categoryExists)
            throw new ArgumentException("Category not found.");

        var product = new Product
        {
            Name = dto.Name.Trim(),
            Description = dto.Description,
            Price = dto.Price,
            Quantity = dto.Quantity,
            CategoryId = dto.CategoryId,
            CreatedAt = DateTime.UtcNow
        };

        db.Products.Add(product);
        await db.SaveChangesAsync();

        return (await GetByIdAsync(product.Id))!;
    }

    public async Task<ProductReadDto?> UpdateAsync(int id, ProductUpdateDto dto)
    {
        Validate(dto.Name, dto.Price, dto.Quantity);

        var product = await db.Products.FindAsync(id);
        if (product is null)
            return null;

        var categoryExists = await db.Categories.AnyAsync(c => c.Id == dto.CategoryId);
        if (!categoryExists)
            throw new ArgumentException("Category not found.");

        product.Name = dto.Name.Trim();
        product.Description = dto.Description;
        product.Price = dto.Price;
        product.Quantity = dto.Quantity;
        product.CategoryId = dto.CategoryId;

        await db.SaveChangesAsync();
        return await GetByIdAsync(id);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var product = await db.Products.FindAsync(id);
        if (product is null)
            return false;

        db.Products.Remove(product);
        await db.SaveChangesAsync();
        return true;
    }

    private static void Validate(string name, decimal price, int quantity)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Name is required.");
        if (price < 0)
            throw new ArgumentException("Price must be >= 0.");
        if (quantity < 0)
            throw new ArgumentException("Quantity must be >= 0.");
    }
}
