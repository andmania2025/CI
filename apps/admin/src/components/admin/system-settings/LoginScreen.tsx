import { Building2 } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface LoginScreenProps {
  onLogin: () => void;
}

// テストユーザー情報
const TEST_USERS = [
  {
    id: "admin",
    password: "admin123",
    name: "管理者",
  },
  {
    id: "test001",
    password: "test2024",
    name: "テストユーザー1",
  },
  {
    id: "demo",
    password: "demo456",
    name: "デモユーザー",
  },
];

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // 入力値チェック
    if (!loginId.trim() || !password.trim()) {
      setError("ログインIDとパスワードを入力してください。");
      setIsLoading(false);
      return;
    }

    // 認証処理（実際のAPIコールをシミュレート）
    setTimeout(() => {
      const user = TEST_USERS.find((u) => u.id === loginId && u.password === password);

      if (user) {
        // ログイン成功
        localStorage.setItem("currentUser", JSON.stringify(user));
        onLogin();
      } else {
        // ログイン失敗
        setError("ログインIDまたはパスワードが正しくありません。");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleTestLogin = (testUser: (typeof TEST_USERS)[0]) => {
    setLoginId(testUser.id);
    setPassword(testUser.password);
    setError("");
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-800 text-white py-4 px-6">
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8" />
          <h1 className="text-xl font-bold">ウチカツ</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">管理者ログイン</h2>

            {/* テストユーザー情報 */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h3 className="text-sm font-medium text-blue-800 mb-3">テストユーザー</h3>
              <div className="space-y-2">
                {TEST_USERS.map((user, _index) => (
                  <div key={user.id} className="flex items-center justify-between text-xs">
                    <div className="text-gray-600">
                      <span className="font-medium">ID:</span> {user.id} /
                      <span className="font-medium"> PW:</span> {user.password}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleTestLogin(user)}
                      className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
                    >
                      入力
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="loginId" className="block text-sm font-medium text-gray-700 mb-2">
                  ログインID
                </label>
                <input
                  id="loginId"
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="ログインIDを入力"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  パスワード
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="パスワードを入力"
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-700 text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "ログイン中..." : "ログイン"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
