using CVGeneratorAPI.Models;
using CVGeneratorAPI.Services;
using Microsoft.AspNetCore.Mvc;

[Route("api/cv")]
[ApiController]
public class CVController : ControllerBase
{
    private readonly CVService _cvService;

    public CVController(CVService cvService)
    {
        _cvService = cvService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _cvService.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var cv = await _cvService.GetByIdAsync(id);
        return cv == null ? NotFound() : Ok(cv);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CVModel cv)
    {
        await _cvService.CreateAsync(cv);
        return CreatedAtAction(nameof(GetById), new { id = cv.Id }, cv);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, CVModel cv)
    {
        var existingCV = await _cvService.GetByIdAsync(id);
        if (existingCV == null) return NotFound();
        await _cvService.UpdateAsync(id, cv);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var cv = await _cvService.GetByIdAsync(id);
        if (cv == null) return NotFound();
        await _cvService.DeleteAsync(id);
        return NoContent();
    }
}
