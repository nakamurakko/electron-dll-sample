using SampleLib;
using System.Threading.Tasks;
using Xunit;

namespace SampleLibTest;

public sealed class UnitTestGreeting
{

    [Fact]
    public async Task TestGreeting()
    {
        var reply = await new Greeting().Reply("hoge");

        Assert.True(reply is string);
        Assert.Equal("Hello hoge.", reply);
    }

}