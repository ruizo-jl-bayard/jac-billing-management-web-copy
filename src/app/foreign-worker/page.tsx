import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForeignWorkerPage() {
  return (
    <div className="grid gap-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>外国人就労者検索</CardTitle>
            <CardDescription>
              外国人就労者の情報を検索・管理するページです
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                ここに外国人就労者の検索機能と一覧表示が実装されます。
              </p>
              <div className="grid gap-2 p-4 bg-muted rounded-lg">
                <div className="text-sm font-medium">機能予定:</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 外国人就労者の検索</li>
                  <li>• 就労者情報の表示</li>
                  <li>• ビザ状況の確認</li>
                  <li>• 就労履歴の管理</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
