namespace ProductInventory.Api.DTOs;

public record CategoryCreateDto(string Name, string? Description);
public record CategoryReadDto(int Id, string Name, string? Description);
