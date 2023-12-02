using SampleLib;
using Xunit;

namespace SampleLibTest;

public sealed class UnitTestGreeting
{
    [Fact]
    public async void TestGreeting()
    {
        var reply = await new Greeting().Reply("hoge");

        Assert.True(reply is string);
        Assert.Equal("Hello hoge.", reply);
    }
}