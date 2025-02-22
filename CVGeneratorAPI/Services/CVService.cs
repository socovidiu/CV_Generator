using CVGeneratorAPI.Models;
using CVGeneratorAPI.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CVGeneratorAPI.Services;

public class CVService
{
    private readonly IMongoCollection<CVModel> _cvCollection;

    public CVService(IOptions<MongoDBSettings> mongoDBSettings)
    {
        var client = new MongoClient(mongoDBSettings.Value.ConnectionString);
        var database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
        _cvCollection = database.GetCollection<CVModel>(mongoDBSettings.Value.CollectionName);
    }

    public async Task<List<CVModel>> GetAllAsync() 
    {
        return await _cvCollection.Find(_ => true).ToListAsync();
    } 
    public async Task<CVModel?> GetByIdAsync(string id) => await _cvCollection.Find(cv => cv.Id == id).FirstOrDefaultAsync();
    public async Task CreateAsync(CVModel cv) => await _cvCollection.InsertOneAsync(cv);
    public async Task UpdateAsync(string id, CVModel cv) => await _cvCollection.ReplaceOneAsync(c => c.Id == id, cv);
    public async Task DeleteAsync(string id) => await _cvCollection.DeleteOneAsync(c => c.Id == id);
}
