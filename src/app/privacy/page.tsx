export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">개인정보 처리방침</h1>

            <div className="prose prose-slate max-w-none">
                <p className="text-sm text-gray-500 mb-8">
                    시행일자: 2024년 03월 20일
                </p>

                <section className="mb-8">
                    <p>
                        프로젝트 원제로(이하 '회사')는 리뷰 공작소 서비스(이하 '서비스') 이용자의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">1. 개인정보의 처리 목적</h2>
                    <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
                    <ul className="list-disc pl-6 mt-2">
                        <li>회원 가입 및 관리</li>
                        <li>서비스 제공 및 운영</li>
                        <li>고객 상담 및 문의 응대</li>
                        <li>서비스 이용 기록 분석 및 통계</li>
                        <li>서비스 개선 및 맞춤형 서비스 제공</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">2. 개인정보의 처리 및 보유기간</h2>
                    <p>회사는 법령에 따른 개인정보 보유·이용기간 또는 이용자로부터 개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
                    <ul className="list-disc pl-6 mt-2">
                        <li>회원 가입 정보: 회원 탈퇴 시까지</li>
                        <li>서비스 이용 기록: 서비스 종료 시까지</li>
                        <li>결제 및 정산 기록: 5년</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">3. 개인정보의 제3자 제공</h2>
                    <p>회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.</p>
                    <ul className="list-disc pl-6 mt-2">
                        <li>이용자가 사전에 동의한 경우</li>
                        <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">4. 개인정보의 파기</h2>
                    <p>회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</p>
                    <ul className="list-disc pl-6 mt-2">
                        <li>전자적 파일 형태인 경우: 복구 및 재생되지 않도록 안전하게 삭제</li>
                        <li>그 외의 기록물: 파쇄 또는 소각</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">5. 이용자의 권리와 그 행사방법</h2>
                    <p>이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.</p>
                    <ul className="list-disc pl-6 mt-2">
                        <li>개인정보 열람 요구</li>
                        <li>오류 등이 있을 경우 정정 요구</li>
                        <li>삭제 요구</li>
                        <li>처리정지 요구</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">6. 개인정보의 안전성 확보조치</h2>
                    <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
                    <ul className="list-disc pl-6 mt-2">
                        <li>관리적 조치: 내부관리계획 수립 및 시행, 정기적 직원 교육</li>
                        <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치</li>
                        <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">7. 개인정보 보호책임자</h2>
                    <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
                    <div className="mt-4">
                        <p>▶ 개인정보 보호책임자</p>
                        <p>이메일: juwonchun@gmail.com</p>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">8. 개인정보 처리방침 변경</h2>
                    <p>
                        이 개인정보 처리방침은 2024년 03월 20일부터 적용됩니다. 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
                    </p>
                </section>
            </div>
        </div>
    )
} 