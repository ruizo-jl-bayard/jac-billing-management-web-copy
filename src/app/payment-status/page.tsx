import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentStatusPage() {
  return (
    <div className="grid gap-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>支払い状況検索</CardTitle>
            <CardDescription>
              支払い状況を検索・管理するページです
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                ここに支払い状況の検索機能と一覧表示が実装されます。
              </p>
              <div className="grid gap-2 p-4 bg-muted rounded-lg">
                <div className="text-sm font-medium">機能予定:</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 未払い・支払い済みのフィルタリング</li>
                  <li>• 詳細情報の確認</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
