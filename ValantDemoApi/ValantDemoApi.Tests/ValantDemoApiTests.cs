using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Newtonsoft.Json;
using NUnit.Framework;
using System.Collections.Generic;
using ValantDemoApi.Models; 

namespace ValantDemoApi.Tests
{
    [TestFixture]
    public class ValantDemoApiTests
    {
      private HttpClient client;

      [OneTimeSetUp]
        public void Setup()
        {
          var factory = new APIWebApplicationFactory();
          this.client = factory.CreateClient();
        }

        [Test]
        public async Task ShouldReturnAllFourDirectionsForMovementThroughMaze()
        {
          var result = await this.client.GetAsync("/Maze");
          result.EnsureSuccessStatusCode();
          var content = JsonConvert.DeserializeObject<string[]>(await result.Content.ReadAsStringAsync());
          content.Should().Contain("Up");
          content.Should().Contain("Down");
          content.Should().Contain("Left");
          content.Should().Contain("Right");
        }
        [Test]
        public async Task ShouldReturnListOfMazeFormats()
        {
          var result = await this.client.GetAsync("/Maze/Formats");
          result.EnsureSuccessStatusCode();
          var content = JsonConvert.DeserializeObject<List<MazeFormatModel>>(await result.Content.ReadAsStringAsync());
          content.Should().BeOfType<List<MazeFormatModel>>();
        }
    }
}
