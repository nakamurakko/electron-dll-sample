using System.Threading.Tasks;

namespace SampleLib
{
    /// <summary>
    /// 挨拶クラス。
    /// </summary>
    public class Greeting
    {
        /// <summary>
        /// 挨拶を返す。
        /// </summary>
        /// <param name="value">挨拶の相手。</param>
        /// <returns>挨拶</returns>
        public async Task<object> Reply(string value)
        {
            return await Task.Run(() =>
            {
                return $"Hello {value}.";
            });
        }
    }
}
