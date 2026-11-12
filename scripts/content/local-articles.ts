/**
 * Bài viết dự thảo nhắm người đọc ở Đồng Nai, CHỈ tiếng Việt.
 *
 * Vì sao chỉ tiếng Việt: người tìm "luật sư Biên Hòa", "ly hôn ở Đồng Nai",
 * "tranh chấp đất Đồng Nai" gõ bằng tiếng Việt. Bản tiếng Anh, tiếng Trung của
 * những bài về tòa khu vực hay UBND phường gần như không có người đọc, mà dịch
 * sai một tên cơ quan lại thành thông tin sai.
 *
 * Nguyên tắc giống scripts/content/articles.ts: chỉ nói về quy trình và quy
 * định chung có dẫn nguồn, không tư vấn cho tình huống cụ thể, không hứa kết
 * quả, không nêu giá. Mọi bài nạp ở trạng thái NHÁP; luật sư của công ty rà
 * soát, ghi tên tác giả chịu trách nhiệm rồi mới xuất bản.
 *
 * Dữ kiện địa phương kiểm tra ngày 12/11/2026:
 *   - Đồng Nai (đã hợp nhất với Bình Phước từ 01/7/2025) là thành phố trực
 *     thuộc Trung ương từ 30/4/2026.
 *   - Từ 01/7/2025 không còn Tòa án cấp huyện; Tòa án nhân dân khu vực 1 -
 *     Đồng Nai kế thừa Tòa án Biên Hòa cũ, trụ sở số 1 Nguyễn Du, phường Trấn
 *     Biên, phụ trách 9 phường theo Nghị quyết 81/2025/UBTVQH15. Tòa án nhân
 *     dân tối cao đang soạn dự thảo điều chỉnh phạm vi lãnh thổ, nên bài nhắc
 *     người đọc tra lại trước khi nộp.
 * Khi một trong các dữ kiện này đổi, sửa bài trong CMS (prepare-editorial
 * không ghi đè bài đã có).
 */

export type LocalArticle = {
  slug: string;
  title: string;
  summary: string;
  keywords: string;
  sections: { heading: string; body: string }[];
  sources: { label: string; url: string }[];
  seoTitle: string;
  seoDescription: string;
  /** Đường dẫn danh mục, xem scripts/prepare-categories.ts. */
  categories: string[];
  /** Đường dẫn lĩnh vực hiện bài này ở ô "Bài liên quan". */
  services: string[];
};

const search = (number: string) =>
  "https://thuvienphapluat.vn/page/tim-van-ban.aspx?keyword=" +
  encodeURIComponent(number);

const BO_LUAT_TO_TUNG = {
  label:
    "Bộ luật Tố tụng dân sự 2015 (số 92/2015/QH13, đã sửa đổi): Điều 35, 39, 40, 190",
  url: search("92/2015/QH13"),
};

export const localArticles: LocalArticle[] = [
  {
    slug: "cach-chon-luat-su-uy-tin-tai-dong-nai",
    title: "Cách chọn luật sư uy tín tại Đồng Nai: 7 điều nên kiểm tra",
    summary:
      'Gõ "luật sư uy tín Đồng Nai" sẽ ra hàng chục văn phòng. Bảy điều nên kiểm tra trước khi ký hợp đồng dịch vụ, từ thẻ luật sư, giấy đăng ký hoạt động đến cách tính phí và lời hứa "chắc thắng".',
    keywords:
      "luật sư uy tín đồng nai, luật sư biên hòa, chọn luật sư, văn phòng luật sư đồng nai, công ty luật đồng nai, luat su dong nai, thẻ luật sư",
    seoTitle: "Cách chọn luật sư uy tín tại Đồng Nai, Biên Hòa",
    seoDescription:
      "7 điều nên kiểm tra trước khi thuê luật sư ở Đồng Nai, Biên Hòa: thẻ luật sư, giấy đăng ký hoạt động, hợp đồng dịch vụ, cách tính phí, bảo mật.",
    categories: ["lam-viec-voi-luat-su"],
    services: [],
    sections: [
      {
        heading: "1. Người tư vấn có thẻ luật sư không",
        body: "Chỉ người có Chứng chỉ hành nghề luật sư, đã gia nhập một Đoàn luật sư và được cấp thẻ luật sư mới được hành nghề luật sư, trong đó có việc tham gia tố tụng bảo vệ bạn tại tòa. Nhân viên tư vấn, chuyên viên pháp lý có thể hỗ trợ giấy tờ nhưng không thay được luật sư trong những việc luật dành riêng cho luật sư.\n\nBạn có quyền đề nghị xem thẻ luật sư và hỏi luật sư thuộc Đoàn luật sư nào. Luật sư ở Đồng Nai thường thuộc Đoàn Luật sư thành phố Đồng Nai (trước ngày 30/4/2026 là Đoàn Luật sư tỉnh Đồng Nai), nhưng luật sư thuộc Đoàn khác vẫn được hành nghề trên cả nước.",
      },
      {
        heading: "2. Văn phòng hay công ty luật có giấy đăng ký hoạt động",
        body: "Văn phòng luật sư và công ty luật phải có Giấy đăng ký hoạt động do Sở Tư pháp nơi đặt trụ sở cấp. Giấy này ghi tên, địa chỉ trụ sở và người đại diện theo pháp luật của tổ chức. Một địa chỉ cụ thể, có biển hiệu, đến làm việc trực tiếp được là dấu hiệu tối thiểu; chỉ có số điện thoại và trang mạng xã hội thì nên hỏi thêm.\n\nTên trên hợp đồng, trên hóa đơn và trên giấy đăng ký hoạt động phải là một. Nếu bạn được đề nghị chuyển tiền vào tài khoản cá nhân không rõ của ai, hãy dừng lại hỏi rõ.",
      },
      {
        heading: "3. Ai sẽ trực tiếp làm hồ sơ của bạn",
        body: "Người tiếp bạn buổi đầu chưa chắc là người theo vụ việc đến cùng. Hãy hỏi: luật sư nào chịu trách nhiệm chính, ai hỗ trợ, khi cần cập nhật thì liên hệ ai và trong bao lâu thì được trả lời. Tên luật sư chịu trách nhiệm nên được ghi trong hợp đồng dịch vụ hoặc trong văn bản ủy quyền.",
      },
      {
        heading: "4. Có hợp đồng dịch vụ pháp lý bằng văn bản",
        body: 'Luật Luật sư yêu cầu hợp đồng dịch vụ pháp lý phải làm thành văn bản. Hợp đồng nên ghi rõ: phạm vi công việc (chỉ tư vấn, soạn đơn, hay tham gia tố tụng đến cấp nào), thời hạn, thù lao và chi phí, cách thanh toán, quyền và nghĩa vụ hai bên, và cách chấm dứt hợp đồng giữa chừng.\n\nPhạm vi công việc là chỗ hay phát sinh hiểu lầm nhất. "Lo trọn gói vụ ly hôn" có gồm cả giai đoạn phúc thẩm và thi hành án không? Hỏi trước dễ hơn tranh luận sau.',
      },
      {
        heading: "5. Cách tính phí được nói rõ trước",
        body: "Thù lao luật sư có thể tính theo giờ làm việc, theo vụ việc với mức trọn gói, theo hợp đồng dài hạn hoặc theo tỷ lệ giá trị vụ việc, tùy thỏa thuận. Ngoài thù lao còn có chi phí như đi lại, sao chụp, phí công chứng, án phí, lệ phí nộp cho Nhà nước; những khoản này ai chịu, trả lúc nào cũng nên ghi vào hợp đồng.\n\nMức phí cao hay thấp không nói lên luật sư giỏi hay không. Điều cần là bạn hiểu mình trả cho việc gì, và biết khoản nào có thể phát sinh thêm.",
      },
      {
        heading: '6. Cẩn trọng với lời hứa "chắc thắng"',
        body: 'Kết quả một vụ việc phụ thuộc vào chứng cứ, vào bên kia và vào đánh giá của tòa án hay cơ quan có thẩm quyền. Bộ Quy tắc đạo đức và ứng xử nghề nghiệp luật sư Việt Nam không cho phép luật sư cam kết bảo đảm kết quả để lôi kéo khách hàng.\n\nMột luật sư đáng tin thường nói rõ điểm mạnh, điểm yếu của hồ sơ, các phương án và rủi ro của từng phương án. Lời hứa "quen tòa", "chắc chắn thắng" là dấu hiệu nên tránh.',
      },
      {
        heading: "7. Thông tin của bạn được giữ bí mật",
        body: "Luật sư có nghĩa vụ giữ bí mật thông tin về vụ việc và về khách hàng mà mình biết được khi hành nghề. Hỏi luật sư sẽ nhận tài liệu qua kênh nào, ai trong văn phòng được xem hồ sơ. Ở buổi trao đổi đầu, bạn chỉ cần mang bản sao và bản tóm tắt; bản gốc giấy tờ quan trọng nên giữ lại cho đến khi đã ký hợp đồng và biết rõ bản gốc dùng vào việc gì.",
      },
      {
        heading: "Đánh giá trên Google có đáng tin không",
        body: "Đánh giá là một nguồn tham khảo, nhưng hãy đọc nội dung thay vì chỉ nhìn số sao: người viết kể cụ thể việc gì, luật sư trao đổi ra sao, có phản hồi khi khách phàn nàn không. Nhiều đánh giá ngắn giống hệt nhau, đăng dồn trong vài ngày là dấu hiệu nên dè dặt.\n\nỞ Đồng Nai, phần lớn vụ việc dân sự, hôn nhân, đất đai được giải quyết tại tòa án khu vực nơi bị đơn cư trú hoặc nơi có đất. Một luật sư gần nơi giải quyết thuận tiện cho việc đi lại, nhưng chuyên môn đúng lĩnh vực và cách làm việc minh bạch vẫn quan trọng hơn khoảng cách.",
      },
    ],
    sources: [
      {
        label:
          "Luật Luật sư 2006 (số 65/2006/QH11), sửa đổi bởi Luật số 20/2012/QH13: Điều 2, 5, 25, 26, 35, 55",
        url: search("20/2012/QH13"),
      },
      {
        label:
          "Bộ Quy tắc đạo đức và ứng xử nghề nghiệp luật sư Việt Nam (Quyết định 201/QĐ-HĐLSTQ ngày 13/12/2019)",
        url: search("201/QĐ-HĐLSTQ"),
      },
    ],
  },
  {
    slug: "nop-don-o-toa-an-nao-tai-dong-nai",
    title: "Nộp đơn ở tòa án nào tại Đồng Nai sau khi sắp xếp tòa án khu vực",
    summary:
      "Từ 01/7/2025 không còn Tòa án Biên Hòa hay tòa án huyện. Cách xác định tòa án khu vực có thẩm quyền ở Đồng Nai, những trường hợp được chọn tòa và cách nộp đơn trực tiếp, qua bưu điện hoặc trực tuyến.",
    keywords:
      "tòa án khu vực đồng nai, tòa án biên hòa, nộp đơn khởi kiện ở đâu, tòa án khu vực 1 đồng nai, thẩm quyền tòa án, toa an bien hoa, nộp đơn ly hôn đồng nai",
    seoTitle: "Nộp đơn ở tòa án nào tại Đồng Nai, Biên Hòa?",
    seoDescription:
      "Tòa án Biên Hòa nay là Tòa án nhân dân khu vực 1 - Đồng Nai. Cách xác định tòa có thẩm quyền, các trường hợp được chọn tòa và cách nộp đơn.",
    categories: ["tranh-chap"],
    services: ["giai-quyet-tranh-chap"],
    sections: [
      {
        heading: "Tòa án ở Đồng Nai đã thay đổi thế nào",
        body: 'Từ ngày 01/7/2025, Tòa án nhân dân cấp huyện được tổ chức lại thành Tòa án nhân dân khu vực. Đồng Nai sau khi hợp nhất với Bình Phước có 14 tòa án khu vực, mỗi tòa phụ trách một nhóm phường, xã. Từ ngày 30/4/2026, Đồng Nai trở thành thành phố trực thuộc Trung ương, và các cơ quan mang tên tỉnh Đồng Nai chuyển sang tên thành phố Đồng Nai.\n\nVì vậy, đơn ghi gửi "Tòa án nhân dân thành phố Biên Hòa" hay "Tòa án nhân dân huyện Trảng Bom" là ghi theo tên cũ. Hãy ghi đúng tên tòa án khu vực đang có thẩm quyền.',
      },
      {
        heading: "Khu vực Biên Hòa cũ: Tòa án nhân dân khu vực 1 - Đồng Nai",
        body: "Tòa án nhân dân khu vực 1 - Đồng Nai kế thừa Tòa án Biên Hòa trước đây, trụ sở tại số 1 Nguyễn Du, phường Trấn Biên. Theo Nghị quyết 81/2025/UBTVQH15, tòa phụ trách 9 phường: Biên Hòa, Trấn Biên, Tam Hiệp, Long Bình, Long Hưng, Phước Tân, Tam Phước, Trảng Dài và Tân Triều.\n\nPhạm vi lãnh thổ của các tòa khu vực có thể được điều chỉnh khi địa giới phường, xã thay đổi. Trước khi nộp, hãy đối chiếu lại trên Cổng thông tin điện tử của Tòa án nhân dân tối cao hoặc gọi điện hỏi bộ phận tiếp nhận đơn của tòa.",
      },
      {
        heading: "Quy tắc chung: tòa nơi bị đơn cư trú",
        body: "Với phần lớn tranh chấp dân sự, hôn nhân gia đình, kinh doanh thương mại và lao động, tòa có thẩm quyền là tòa án khu vực nơi bị đơn cư trú, làm việc (nếu bị đơn là cá nhân) hoặc nơi bị đơn có trụ sở (nếu là tổ chức).\n\nVí dụ: bạn ở Long Khánh, người nợ tiền bạn ở phường Tam Hiệp, thì đơn đòi nợ thường nộp tại Tòa án khu vực 1 - Đồng Nai, không phải tòa nơi bạn ở.",
      },
      {
        heading: "Những trường hợp không theo nơi bị đơn",
        body: "Tranh chấp về bất động sản, như tranh chấp ranh giới đất, quyền sử dụng đất: nộp tại tòa nơi có bất động sản, dù các bên ở đâu.\n\nLy hôn thuận tình: nộp tại tòa nơi một trong hai vợ chồng cư trú, làm việc.\n\nCác bên có thể thỏa thuận bằng văn bản để tòa nơi nguyên đơn cư trú giải quyết, trừ tranh chấp về bất động sản.\n\nKhông biết bị đơn đang ở đâu: có thể nộp tại tòa nơi bị đơn cư trú, làm việc hoặc có tài sản cuối cùng.",
      },
      {
        heading: "Ba cách nộp đơn",
        body: "Nộp trực tiếp tại bộ phận tiếp nhận đơn của tòa án.\n\nGửi qua dịch vụ bưu chính; ngày nộp đơn được tính theo ngày có dấu bưu điện nơi gửi.\n\nGửi trực tuyến qua Cổng thông tin điện tử của tòa án, nếu tòa đã triển khai.\n\nDù nộp cách nào, hãy giữ bản sao đơn, danh mục tài liệu đã nộp và biên nhận hoặc phiếu gửi.",
      },
      {
        heading: "Nộp nhầm tòa thì sao",
        body: "Nếu vụ việc không thuộc thẩm quyền, tòa án nhận đơn sẽ chuyển đơn cho tòa có thẩm quyền và báo cho người khởi kiện. Đơn không bị mất, nhưng mất thêm thời gian. Điều này quan trọng khi vụ việc sắp hết thời hiệu khởi kiện, ví dụ tranh chấp hợp đồng thường có thời hiệu ba năm. Trường hợp đó nên xác định tòa thật chính xác ngay từ đầu, hoặc nhờ luật sư kiểm tra trước khi nộp.",
      },
    ],
    sources: [
      BO_LUAT_TO_TUNG,
      {
        label:
          "Nghị quyết 81/2025/UBTVQH15 về thành lập Tòa án nhân dân cấp tỉnh, Tòa án nhân dân khu vực; phạm vi thẩm quyền theo lãnh thổ",
        url: search("81/2025/UBTVQH15"),
      },
      {
        label: "Nghị quyết 30/2026/QH16 về thành lập thành phố Đồng Nai",
        url: search("30/2026/QH16"),
      },
    ],
  },
  {
    slug: "ly-hon-tai-bien-hoa-dong-nai",
    title: "Ly hôn ở Biên Hòa, Đồng Nai: nộp đơn ở đâu, cần giấy tờ gì",
    summary:
      "Ly hôn thuận tình hay đơn phương, nộp ở tòa án khu vực nào tại Đồng Nai, cần chuẩn bị giấy tờ gì và những điều về con chung, tài sản chung nên biết trước khi nộp đơn.",
    keywords:
      "ly hôn biên hòa, ly hôn đồng nai, nộp đơn ly hôn ở đâu, thủ tục ly hôn, ly hôn đơn phương, ly hôn thuận tình, luật sư ly hôn đồng nai, ly hon bien hoa",
    seoTitle: "Ly hôn ở Biên Hòa, Đồng Nai: nộp đơn ở đâu, giấy tờ gì",
    seoDescription:
      "Thủ tục ly hôn thuận tình và đơn phương ở Biên Hòa, Đồng Nai: tòa án khu vực có thẩm quyền, giấy tờ cần có, án phí, quyền nuôi con và chia tài sản.",
    categories: ["hon-nhan-gia-dinh"],
    services: ["hon-nhan-gia-dinh"],
    sections: [
      {
        heading: "Thuận tình hay đơn phương",
        body: "Ly hôn thuận tình: hai vợ chồng cùng yêu cầu, đã thỏa thuận được việc nuôi con, cấp dưỡng và chia tài sản. Tòa giải quyết theo thủ tục việc dân sự, thường nhanh hơn.\n\nLy hôn đơn phương: một bên yêu cầu, hoặc hai bên cùng muốn ly hôn nhưng chưa thống nhất được về con hay tài sản. Tòa giải quyết theo thủ tục vụ án, có hòa giải, có thể phải xét xử.\n\nLưu ý: người chồng không có quyền yêu cầu ly hôn khi người vợ đang có thai, sinh con hoặc đang nuôi con dưới 12 tháng tuổi. Hạn chế này không áp dụng với yêu cầu của người vợ.",
      },
      {
        heading: "Nộp đơn ở tòa nào tại Đồng Nai",
        body: "Ly hôn thuận tình: nộp tại tòa án khu vực nơi một trong hai vợ chồng cư trú, làm việc.\n\nLy hôn đơn phương: nộp tại tòa án khu vực nơi bị đơn (người kia) cư trú, làm việc. Hai bên có thể thỏa thuận bằng văn bản để tòa nơi nguyên đơn cư trú giải quyết.\n\nNếu người kia ở các phường Biên Hòa, Trấn Biên, Tam Hiệp, Long Bình, Long Hưng, Phước Tân, Tam Phước, Trảng Dài hoặc Tân Triều, tòa có thẩm quyền hiện là Tòa án nhân dân khu vực 1 - Đồng Nai (số 1 Nguyễn Du, phường Trấn Biên). Phạm vi các tòa khu vực có thể điều chỉnh, nên hãy kiểm tra lại trước khi nộp.\n\nNhiều người ở Đồng Nai đi làm ở TP.HCM, Bình Dương cũ hoặc nước ngoài. Khi đó cần xác định nơi cư trú hiện tại của bị đơn; không biết người kia ở đâu thì nộp tại tòa nơi người đó cư trú cuối cùng.",
      },
      {
        heading: "Giấy tờ cần chuẩn bị",
        body: "Đơn khởi kiện ly hôn (đơn phương) hoặc đơn yêu cầu công nhận thuận tình ly hôn (có chữ ký của cả hai).\n\nBản chính Giấy chứng nhận kết hôn. Nếu mất, xin trích lục kết hôn tại Ủy ban nhân dân nơi đã đăng ký kết hôn.\n\nCăn cước hoặc giấy tờ tùy thân của hai vợ chồng.\n\nGiấy khai sinh của các con chung.\n\nGiấy tờ về tài sản chung nếu yêu cầu tòa chia: giấy chứng nhận quyền sử dụng đất, đăng ký xe, sổ tiết kiệm.\n\nThông tin nơi cư trú của bị đơn. Từ khi bỏ sổ hộ khẩu giấy, nơi cư trú được tra trên Cơ sở dữ liệu quốc gia về dân cư, và có thể xin xác nhận thông tin cư trú khi cần.",
      },
      {
        heading: "Án phí và thời gian",
        body: "Theo Nghị quyết 326/2016/UBTVQH14, án phí sơ thẩm vụ ly hôn không có tranh chấp về tài sản là 300.000 đồng. Có tranh chấp tài sản thì cộng thêm án phí tính theo giá trị phần tài sản mỗi bên được chia. Người khởi kiện nộp tạm ứng án phí sau khi tòa thông báo.\n\nThời gian giải quyết khác nhau theo từng vụ, phụ thuộc vào việc hai bên có hợp tác, có tài sản phải định giá hay không. Ly hôn thuận tình thường ngắn hơn đáng kể so với ly hôn có tranh chấp.",
      },
      {
        heading: "Con chung: tòa xem xét điều gì",
        body: "Hai bên được thỏa thuận ai trực tiếp nuôi con. Không thỏa thuận được thì tòa quyết định dựa trên quyền lợi mọi mặt của con. Con từ đủ 7 tuổi trở lên thì tòa xem xét nguyện vọng của con. Con dưới 36 tháng tuổi được giao cho mẹ trực tiếp nuôi, trừ khi người mẹ không đủ điều kiện hoặc hai bên có thỏa thuận khác phù hợp với lợi ích của con.\n\nNgười không trực tiếp nuôi con có nghĩa vụ cấp dưỡng và có quyền thăm nom con.",
      },
      {
        heading: "Tài sản chung: tách riêng nếu cần",
        body: "Nếu tài sản phức tạp (nhiều thửa đất, nhà đang thế chấp ngân hàng, phần vốn trong công ty), hai bên có thể đề nghị tòa giải quyết ly hôn và con chung trước, để tài sản tự thỏa thuận hoặc giải quyết bằng vụ kiện khác. Cách này giúp việc ly hôn không bị kéo dài vì định giá tài sản. Mỗi gia đình mỗi khác, nên cân nhắc với luật sư trước khi chọn.",
      },
    ],
    sources: [
      {
        label:
          "Luật Hôn nhân và gia đình 2014 (số 52/2014/QH13): Điều 51, 55, 56, 81, 82, 83",
        url: search("52/2014/QH13"),
      },
      BO_LUAT_TO_TUNG,
      {
        label:
          "Nghị quyết 326/2016/UBTVQH14 về án phí, lệ phí Tòa án: Danh mục án phí",
        url: search("326/2016/UBTVQH14"),
      },
    ],
  },
  {
    slug: "tranh-chap-dat-dai-tai-dong-nai",
    title:
      "Tranh chấp đất đai ở Đồng Nai: hòa giải ở phường, xã và khởi kiện ra tòa",
    summary:
      "Tranh chấp ranh giới, lối đi, đất mua bằng giấy tay hay đất trong khu quy hoạch: khi nào phải hòa giải ở Ủy ban nhân dân phường, xã trước, khi nào được kiện thẳng ra tòa, và chứng cứ nào nên giữ.",
    keywords:
      "tranh chấp đất đai đồng nai, tranh chấp đất biên hòa, hòa giải tranh chấp đất đai, khởi kiện đất đai, luật sư đất đai đồng nai, tranh chap dat dai, mua đất giấy tay, ranh giới đất",
    seoTitle: "Tranh chấp đất đai ở Đồng Nai: hòa giải và khởi kiện",
    seoDescription:
      "Tranh chấp đất đai tại Đồng Nai, Biên Hòa: khi nào phải hòa giải ở UBND phường, xã, khi nào khởi kiện ra tòa, tòa nào giải quyết và chứng cứ cần giữ.",
    categories: ["dat-dai-nha-o", "tranh-chap"],
    services: ["dat-dai-bat-dong-san", "giai-quyet-tranh-chap"],
    sections: [
      {
        heading: "Vì sao tranh chấp đất ở Đồng Nai hay phức tạp",
        body: "Đất ở Đồng Nai tăng giá nhanh theo các dự án hạ tầng lớn, nhiều khu vực chuyển từ đất nông nghiệp sang đất ở, và không ít giao dịch trước đây làm bằng giấy tay hoặc mua chung một giấy chứng nhận. Ranh giới thực tế nhiều nơi khác với bản đồ địa chính. Thêm vào đó, việc sắp xếp lại phường, xã khiến tên địa danh trên giấy tờ cũ khác tên hiện tại.\n\nVì vậy, bước đầu tiên không phải là viết đơn, mà là xác định đúng mình đang tranh chấp về điều gì.",
      },
      {
        heading: "Phân biệt hai loại tranh chấp",
        body: "Tranh chấp đất đai theo nghĩa hẹp: tranh chấp ai là người có quyền sử dụng đất, ranh giới, mốc giới, lối đi giữa các thửa đất.\n\nTranh chấp liên quan đến đất: tranh chấp hợp đồng chuyển nhượng, đặt cọc, tặng cho, thế chấp; tranh chấp chia thừa kế quyền sử dụng đất; chia tài sản chung là đất khi ly hôn.\n\nCách phân biệt này quyết định có phải hòa giải ở Ủy ban nhân dân phường, xã trước hay không.",
      },
      {
        heading: "Hòa giải tại Ủy ban nhân dân phường, xã",
        body: "Luật Đất đai 2024 khuyến khích các bên tự hòa giải. Với tranh chấp đất đai theo nghĩa hẹp, các bên phải hòa giải tại Ủy ban nhân dân cấp xã nơi có đất trước khi cơ quan có thẩm quyền hoặc tòa án giải quyết. Việc hòa giải thực hiện trong tối đa 30 ngày kể từ khi nhận đơn, do Hội đồng hòa giải do Chủ tịch Ủy ban nhân dân thành lập, và được lập thành biên bản.\n\nVới tranh chấp hợp đồng chuyển nhượng, thừa kế quyền sử dụng đất, hướng dẫn của Hội đồng Thẩm phán cho rằng không bắt buộc phải qua bước hòa giải này mới được khởi kiện.\n\nGiữ kỹ biên bản hòa giải không thành: đây là giấy tờ tòa án sẽ yêu cầu khi nhận đơn tranh chấp loại thứ nhất.",
      },
      {
        heading: "Hòa giải không thành: đi đâu tiếp",
        body: "Đất đã có giấy chứng nhận quyền sử dụng đất hoặc một trong các loại giấy tờ về quyền sử dụng đất theo luật, và tranh chấp về tài sản gắn liền với đất: tòa án giải quyết.\n\nĐất chưa có giấy chứng nhận và không có giấy tờ: các bên chọn hoặc đề nghị Ủy ban nhân dân có thẩm quyền giải quyết, hoặc khởi kiện tại tòa án.\n\nTòa có thẩm quyền là tòa án khu vực nơi có đất, không phụ thuộc nơi các bên đang ở. Đất ở các phường thuộc Biên Hòa cũ hiện thuộc Tòa án nhân dân khu vực 1 - Đồng Nai.",
      },
      {
        heading: "Chứng cứ nên giữ ngay từ bây giờ",
        body: "Giấy chứng nhận quyền sử dụng đất, kể cả bản cũ đã được cấp đổi.\n\nHợp đồng, giấy tay mua bán, giấy nhận tiền, vi bằng nếu có.\n\nBiên lai nộp thuế sử dụng đất qua các năm.\n\nTrích lục, sơ đồ thửa đất, bản đồ địa chính các thời kỳ.\n\nẢnh chụp hiện trạng, hàng rào, mốc giới, có ghi ngày chụp.\n\nThông tin những người biết rõ quá trình sử dụng đất, như hàng xóm lâu năm, trưởng ấp cũ.\n\nKhi giải quyết, tòa thường tổ chức xem xét, thẩm định tại chỗ và có thể đo đạc lại. Chi phí cho việc này do đương sự tạm nộp, nên hãy dự trù.",
      },
      {
        heading: "Trước khi đặt cọc hoặc mua đất",
        body: 'Phần lớn tranh chấp có thể tránh được nếu kiểm tra trước: thông tin quy hoạch, tình trạng thế chấp, người ký có đủ quyền định đoạt không, diện tích thực tế so với giấy chứng nhận. Bài "Kiểm tra pháp lý trước khi đặt cọc mua đất" trong mục Góc nhìn pháp lý trình bày chi tiết từng bước.',
      },
    ],
    sources: [
      {
        label:
          "Luật Đất đai 2024 (số 31/2024/QH15): Điều 235 (hòa giải), Điều 236 (thẩm quyền giải quyết)",
        url: search("31/2024/QH15"),
      },
      {
        label:
          "Nghị định 102/2024/NĐ-CP quy định chi tiết thi hành Luật Đất đai: Điều 105",
        url: search("102/2024/NĐ-CP"),
      },
      {
        label:
          "Nghị quyết 04/2017/NQ-HĐTP của Hội đồng Thẩm phán TANDTC: Điều 3 (điều kiện khởi kiện tranh chấp đất đai)",
        url: search("04/2017/NQ-HĐTP"),
      },
      BO_LUAT_TO_TUNG,
    ],
  },
  {
    slug: "thanh-lap-cong-ty-tai-dong-nai",
    title:
      "Thành lập công ty tại Đồng Nai: hồ sơ, nơi nộp và việc cần làm sau khi có giấy phép",
    summary:
      "Chọn loại hình, ghi địa chỉ trụ sở theo tên phường, xã mới của thành phố Đồng Nai, nộp hồ sơ trực tuyến và những việc thường bị quên sau khi nhận Giấy chứng nhận đăng ký doanh nghiệp.",
    keywords:
      "thành lập công ty đồng nai, thành lập công ty biên hòa, đăng ký kinh doanh đồng nai, mở công ty, thanh lap cong ty dong nai, giấy phép kinh doanh, luật sư doanh nghiệp đồng nai",
    seoTitle: "Thành lập công ty tại Đồng Nai, Biên Hòa: hồ sơ, nơi nộp",
    seoDescription:
      "Thủ tục thành lập công ty tại Đồng Nai: chọn loại hình, ghi địa chỉ theo phường xã mới, nộp hồ sơ trực tuyến, góp vốn và việc cần làm sau đăng ký.",
    categories: ["doanh-nghiep"],
    services: ["dau-tu-doanh-nghiep"],
    sections: [
      {
        heading: "Chọn loại hình trước khi chọn tên",
        body: "Công ty TNHH một thành viên: một chủ sở hữu, phù hợp khi bạn kinh doanh một mình.\n\nCông ty TNHH hai thành viên trở lên: từ 2 đến 50 thành viên, phù hợp khi góp vốn cùng người quen, gia đình.\n\nCông ty cổ phần: từ 3 cổ đông, dễ gọi thêm vốn và chuyển nhượng cổ phần, nhưng quản trị phức tạp hơn.\n\nHộ kinh doanh: không phải doanh nghiệp, chủ hộ chịu trách nhiệm bằng toàn bộ tài sản, phù hợp quy mô nhỏ như cửa hàng, quán ăn.\n\nVới công ty có nhiều người góp vốn, nên thống nhất bằng văn bản ngay từ đầu: ai góp bao nhiêu, góp khi nào, ai quyết định việc gì, một người muốn rút thì sao.",
      },
      {
        heading: "Địa chỉ trụ sở: ghi theo tên phường, xã hiện hành",
        body: 'Từ ngày 01/7/2025, Đồng Nai không còn cấp huyện; từ ngày 30/4/2026, Đồng Nai là thành phố trực thuộc Trung ương. Địa chỉ trụ sở cần ghi theo đơn vị hành chính hiện hành, ví dụ: số nhà, đường, phường Trấn Biên, thành phố Đồng Nai. Hồ sơ ghi "thành phố Biên Hòa, tỉnh Đồng Nai" là ghi theo tên cũ.\n\nTrụ sở không được đặt tại căn hộ chung cư dùng để ở. Nếu thuê văn phòng, nên có hợp đồng thuê rõ ràng vì ngân hàng và cơ quan thuế có thể kiểm tra địa chỉ.',
      },
      {
        heading: "Hồ sơ và nơi nộp",
        body: "Hồ sơ gồm giấy đề nghị đăng ký doanh nghiệp, điều lệ công ty, danh sách thành viên hoặc cổ đông sáng lập (tùy loại hình), bản sao giấy tờ pháp lý của chủ sở hữu, thành viên, và thông tin về chủ sở hữu hưởng lợi theo quy định mới.\n\nHồ sơ nộp cho Phòng Đăng ký kinh doanh của thành phố Đồng Nai, phổ biến nhất là nộp trực tuyến qua Cổng thông tin quốc gia về đăng ký doanh nghiệp. Theo Luật Doanh nghiệp, cơ quan đăng ký kinh doanh xem xét và cấp Giấy chứng nhận đăng ký doanh nghiệp trong 03 ngày làm việc kể từ ngày nhận hồ sơ hợp lệ; hồ sơ chưa hợp lệ sẽ được thông báo nội dung cần sửa.\n\nNhà đầu tư nước ngoài thường phải làm thủ tục đầu tư trước. Dự án trong khu công nghiệp ở Đồng Nai do Ban Quản lý các khu công nghiệp xem xét.",
      },
      {
        heading: "Vốn điều lệ: góp đủ trong 90 ngày",
        body: 'Thành viên, cổ đông phải góp đủ phần vốn đã cam kết trong 90 ngày kể từ ngày được cấp Giấy chứng nhận đăng ký doanh nghiệp, không kể thời gian vận chuyển, làm thủ tục chuyển quyền sở hữu tài sản. Góp không đủ thì công ty phải đăng ký điều chỉnh vốn, và người chưa góp vẫn chịu trách nhiệm với phần đã cam kết trong thời gian đó.\n\nKhông nên đăng ký vốn điều lệ quá cao so với khả năng góp chỉ để "đẹp hồ sơ". Một số ngành nghề có yêu cầu vốn pháp định hoặc ký quỹ riêng; cần kiểm tra trước khi chọn ngành.',
      },
      {
        heading: "Sau khi có giấy chứng nhận: những việc hay bị quên",
        body: "Treo biển tên công ty tại trụ sở.\n\nLàm con dấu nếu cần; doanh nghiệp tự quyết định hình thức, số lượng con dấu.\n\nMở tài khoản ngân hàng đứng tên công ty và cập nhật với cơ quan thuế.\n\nĐăng ký chữ ký số, hóa đơn điện tử, kê khai thuế ban đầu.\n\nGóp vốn đúng hạn và lập sổ đăng ký thành viên hoặc sổ đăng ký cổ đông.\n\nNếu có người lao động: ký hợp đồng lao động, đăng ký tham gia bảo hiểm xã hội.\n\nNhiều khoản phạt hành chính với doanh nghiệp mới phát sinh từ việc trễ hạn kê khai, không phải từ hoạt động kinh doanh.",
      },
    ],
    sources: [
      {
        label:
          "Luật Doanh nghiệp 2020 (số 59/2020/QH14), sửa đổi, bổ sung năm 2025: Điều 26, 47, 75, 113",
        url: search("59/2020/QH14"),
      },
      {
        label: "Nghị định 168/2025/NĐ-CP về đăng ký doanh nghiệp",
        url: search("168/2025/NĐ-CP"),
      },
      {
        label: "Cổng thông tin quốc gia về đăng ký doanh nghiệp",
        url: "https://dangkykinhdoanh.gov.vn",
      },
    ],
  },
  {
    slug: "nguoi-lao-dong-bi-cho-thoi-viec-tai-dong-nai",
    title:
      "Người lao động ở khu công nghiệp Đồng Nai bị cho thôi việc: kiểm tra gì, đòi quyền lợi ở đâu",
    summary:
      "Bị cắt giảm, bị sa thải hay không được ký tiếp hợp đồng: cách kiểm tra công ty làm đúng trình tự chưa, các khoản trợ cấp được nhận, thời hạn nộp hồ sơ bảo hiểm thất nghiệp, nơi giải quyết tranh chấp.",
    keywords:
      "bị cho thôi việc, bị sa thải, cắt giảm lao động đồng nai, trợ cấp thôi việc, trợ cấp mất việc làm, bảo hiểm thất nghiệp đồng nai, luật sư lao động đồng nai, khu công nghiệp biên hòa",
    seoTitle: "Bị cho thôi việc ở Đồng Nai: trợ cấp và cách đòi quyền lợi",
    seoDescription:
      "Bị cắt giảm, sa thải ở Đồng Nai: kiểm tra thời hạn báo trước, trợ cấp thôi việc, mất việc làm, bảo hiểm thất nghiệp và nơi giải quyết tranh chấp.",
    categories: ["lao-dong"],
    services: ["lao-dong-nhan-su"],
    sections: [
      {
        heading: "Bước 1: Xác định vì sao hợp đồng chấm dứt",
        body: 'Quyền lợi phụ thuộc vào lý do chấm dứt, nên hãy yêu cầu công ty đưa văn bản và đọc kỹ căn cứ ghi trong đó:\n\nHết hạn hợp đồng hoặc hai bên thỏa thuận chấm dứt.\n\nCông ty đơn phương chấm dứt vì người lao động thường xuyên không hoàn thành công việc, ốm đau dài ngày, hoặc lý do bất khả kháng.\n\nCắt giảm lao động do thay đổi cơ cấu, công nghệ hoặc vì lý do kinh tế, kể cả khi công ty sáp nhập, chia tách.\n\nSa thải: hình thức kỷ luật, chỉ áp dụng với các hành vi luật liệt kê và phải qua họp xử lý kỷ luật.\n\nĐừng ký vào văn bản "tự nguyện nghỉ việc" nếu bạn không muốn nghỉ: ký rồi thì rất khó chứng minh mình bị cho nghỉ.',
      },
      {
        heading: "Bước 2: Kiểm tra thời hạn báo trước",
        body: "Khi công ty đơn phương chấm dứt hợp đồng, phải báo trước ít nhất 45 ngày với hợp đồng không xác định thời hạn, 30 ngày với hợp đồng từ 12 đến 36 tháng, và 3 ngày làm việc với hợp đồng dưới 12 tháng (một số ngành nghề đặc thù có thời hạn khác).\n\nCắt giảm vì thay đổi cơ cấu hoặc lý do kinh tế mà ảnh hưởng nhiều người: công ty phải xây dựng phương án sử dụng lao động, trao đổi với tổ chức đại diện người lao động ở công ty và báo trước 30 ngày cho cơ quan quản lý lao động cấp tỉnh cùng người lao động.",
      },
      {
        heading: "Bước 3: Tính các khoản được nhận",
        body: "Trợ cấp thôi việc: mỗi năm làm việc được nửa tháng tiền lương, áp dụng khi nghỉ việc thông thường (hết hạn, thỏa thuận, đơn phương đúng luật) và đã làm đủ 12 tháng trở lên.\n\nTrợ cấp mất việc làm: mỗi năm làm việc được 1 tháng tiền lương, ít nhất bằng 2 tháng tiền lương, áp dụng khi bị cắt giảm vì thay đổi cơ cấu, công nghệ, lý do kinh tế hoặc sáp nhập, chia tách.\n\nThời gian đã đóng bảo hiểm thất nghiệp không được tính vào hai khoản trợ cấp này, vì phần đó được bảo hiểm thất nghiệp chi trả.\n\nCông ty phải thanh toán đủ tiền lương còn nợ, tiền phép năm chưa nghỉ và các khoản trợ cấp trong 14 ngày làm việc kể từ ngày chấm dứt hợp đồng (có thể kéo dài nhưng không quá 30 ngày trong một số trường hợp luật cho phép), đồng thời hoàn tất xác nhận thời gian đóng bảo hiểm và trả lại giấy tờ gốc của người lao động.",
      },
      {
        heading: "Bước 4: Nộp hồ sơ bảo hiểm thất nghiệp đúng hạn",
        body: "Theo Luật Việc làm 2025 có hiệu lực từ 01/01/2026, người lao động phải nộp đủ hồ sơ hưởng trợ cấp thất nghiệp trong 03 tháng kể từ ngày chấm dứt hợp đồng, tại trung tâm dịch vụ việc làm. Quá hạn mà không có lý do chính đáng thì mất lượt hưởng của khoảng thời gian đó.\n\nĐừng chờ giải quyết xong tranh chấp với công ty mới nộp. Nếu công ty chậm xác nhận thời gian đóng bảo hiểm, hãy hỏi trung tâm dịch vụ việc làm cách nộp trước và bổ sung sau.",
      },
      {
        heading: "Công ty làm sai thì sao",
        body: "Nếu công ty đơn phương chấm dứt hợp đồng trái pháp luật, người lao động có quyền được nhận trở lại làm việc theo hợp đồng đã giao kết, được trả tiền lương và đóng bảo hiểm cho những ngày không được làm việc, cộng thêm ít nhất 2 tháng tiền lương. Nếu không muốn quay lại, người lao động còn được trợ cấp thôi việc, và hai bên có thể thỏa thuận thêm khoản bồi thường.",
      },
      {
        heading: "Giải quyết tranh chấp ở đâu, trong bao lâu",
        body: "Thông thường, tranh chấp lao động cá nhân phải qua hòa giải viên lao động trước khi đưa ra tòa. Riêng tranh chấp về sa thải, về trường hợp bị đơn phương chấm dứt hợp đồng, về bồi thường, trợ cấp khi chấm dứt hợp đồng thì không bắt buộc qua hòa giải viên, có thể khởi kiện thẳng tại tòa án khu vực nơi công ty có trụ sở.\n\nThời hiệu: 6 tháng để yêu cầu hòa giải viên lao động, và 1 năm để khởi kiện ra tòa, tính từ ngày phát hiện quyền lợi bị xâm phạm. Ở các khu công nghiệp, công đoàn cơ sở cũng là nơi nên liên hệ sớm để được hỗ trợ.\n\nHãy giữ hợp đồng lao động, phiếu lương, quyết định chấm dứt, tin nhắn và email trao đổi với công ty. Đây là chứng cứ chính nếu phải giải quyết tranh chấp.",
      },
    ],
    sources: [
      {
        label:
          "Bộ luật Lao động 2019 (số 45/2019/QH14): Điều 34, 36, 41, 42, 46, 47, 48, 125, 188, 190",
        url: search("45/2019/QH14"),
      },
      {
        label:
          "Luật Việc làm 2025 (số 74/2025/QH15), hiệu lực 01/01/2026: các điều về bảo hiểm thất nghiệp",
        url: search("74/2025/QH15"),
      },
      {
        label:
          "Nghị định 374/2025/NĐ-CP quy định chi tiết Luật Việc làm về bảo hiểm thất nghiệp",
        url: search("374/2025/NĐ-CP"),
      },
    ],
  },
];
