namespace ProductInventory.Api.DTOs;

public record ProductCreateDto(
    string Name,
    string? Description,
    decimal Price,
    int Quantity,
    int CategoryId);

public record ProductUpdateDto(
    string Name,
    string? Description,
    decimal Price,
    int Quantity,
    int CategoryId);

public record ProductReadDto(
    int Id,
    string Name,
    string? Description,
    decimal Price,
    int Quantity,
    int CategoryId,
    string CategoryName,
    DateTime CreatedAt);
