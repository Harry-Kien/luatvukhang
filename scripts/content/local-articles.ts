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
      "Bị cắt giảm, bị kỷ luật buộc nghỉ hay không được ký tiếp hợp đồng: cách kiểm tra công ty làm đúng trình tự chưa, các khoản trợ cấp được nhận, thời hạn nộp hồ sơ bảo hiểm thất nghiệp, nơi giải quyết tranh chấp.",
    keywords:
      "bị cho thôi việc, bị sa thải, cắt giảm lao động đồng nai, trợ cấp thôi việc, trợ cấp mất việc làm, bảo hiểm thất nghiệp đồng nai, luật sư lao động đồng nai, khu công nghiệp biên hòa",
    seoTitle: "Bị cho thôi việc ở Đồng Nai: trợ cấp và cách đòi quyền lợi",
    seoDescription:
      "Bị cắt giảm, buộc nghỉ ở Đồng Nai: kiểm tra thời hạn báo trước, trợ cấp thôi việc, mất việc làm, bảo hiểm thất nghiệp và nơi giải quyết tranh chấp.",
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
  {
    slug: "thua-ke-nha-dat-khong-co-di-chuc-tai-dong-nai",
    title:
      "Thừa kế nhà đất không có di chúc ở Đồng Nai: ai được hưởng, làm thủ tục ở đâu",
    summary:
      "Cha mẹ mất không để lại di chúc, nhà đất ở Đồng Nai chia thế nào: hàng thừa kế, thời hiệu 30 năm, thủ tục khai nhận tại văn phòng công chứng, sang tên và cách xử lý khi anh chị em không thống nhất.",
    keywords:
      "thừa kế nhà đất, thừa kế không có di chúc, chia thừa kế đồng nai, khai nhận di sản, sang tên sổ đỏ thừa kế, luật sư thừa kế biên hòa, thua ke dat dai, hàng thừa kế",
    seoTitle: "Thừa kế nhà đất không có di chúc ở Đồng Nai",
    seoDescription:
      "Chia thừa kế nhà đất không có di chúc tại Đồng Nai: hàng thừa kế, thời hiệu, khai nhận di sản ở văn phòng công chứng, sang tên và khi có tranh chấp.",
    categories: ["hon-nhan-gia-dinh", "dat-dai-nha-o"],
    services: ["hon-nhan-gia-dinh", "dat-dai-bat-dong-san"],
    sections: [
      {
        heading: "Ai được hưởng khi không có di chúc",
        body: "Khi người mất không để lại di chúc, hoặc di chúc không hợp pháp, di sản được chia theo pháp luật, theo thứ tự ba hàng thừa kế:\n\nHàng thứ nhất: vợ, chồng, cha đẻ, mẹ đẻ, cha nuôi, mẹ nuôi, con đẻ, con nuôi của người chết.\n\nHàng thứ hai: ông bà nội ngoại, anh chị em ruột, cháu ruột (người chết là ông, bà).\n\nHàng thứ ba: cụ nội, cụ ngoại, bác, chú, cậu, cô, dì ruột, cháu ruột (người chết là bác, chú, cậu, cô, dì ruột).\n\nNhững người cùng hàng hưởng phần bằng nhau. Hàng sau chỉ được hưởng khi không còn ai ở hàng trước, hoặc họ đều chết, từ chối, không có quyền hưởng. Con của người con đã mất trước cha mẹ được hưởng phần mà cha hoặc mẹ mình lẽ ra được hưởng (thừa kế thế vị).",
      },
      {
        heading: "Tách phần của người còn sống trước",
        body: "Nhà đất thường là tài sản chung của hai vợ chồng. Khi một người mất, chỉ phần của người đó là di sản; phần của người còn sống không đem chia.\n\nVí dụ: cha mất, mẹ còn sống, nhà là tài sản chung. Thông thường một nửa thuộc về mẹ, nửa còn lại là di sản của cha, chia đều cho mẹ và các con (hàng thứ nhất), và cả ông bà nội nếu khi đó còn sống. Mỗi gia đình có thể khác vì nguồn gốc tài sản, nên cần xem giấy tờ cụ thể.",
      },
      {
        heading: "Thời hiệu: 30 năm với nhà đất",
        body: "Thời hiệu để người thừa kế yêu cầu chia di sản là 30 năm đối với bất động sản, 10 năm đối với động sản, tính từ thời điểm người để lại di sản chết. Hết thời hiệu, di sản thuộc về người thừa kế đang quản lý, hoặc được xử lý theo quy định khác của luật.\n\nNhiều gia đình ở Đồng Nai để nhà đất đứng tên ông bà, cha mẹ đã mất từ lâu. Nếu sắp tròn 30 năm, nên làm thủ tục sớm.",
      },
      {
        heading: "Thủ tục khai nhận khi cả nhà thống nhất",
        body: "Khi tất cả người thừa kế đồng ý cách chia, có thể lập văn bản thỏa thuận phân chia di sản (hoặc văn bản khai nhận di sản nếu chỉ có một người hưởng) tại một tổ chức hành nghề công chứng. Giấy tờ thường cần:\n\nGiấy chứng tử của người để lại di sản.\n\nGiấy tờ chứng minh quan hệ: giấy khai sinh, giấy chứng nhận kết hôn, quyết định nhận con nuôi.\n\nGiấy chứng nhận quyền sử dụng đất, quyền sở hữu nhà.\n\nGiấy tờ tùy thân của người thừa kế; văn bản từ chối nhận di sản nếu có người không nhận.\n\nCông chứng viên niêm yết việc thụ lý theo quy định để người có quyền lợi liên quan biết và phản đối nếu có. Sau khi công chứng, người nhận nộp hồ sơ đăng ký biến động (sang tên) tại chi nhánh văn phòng đăng ký đất đai nơi có đất, và kê khai thuế, lệ phí. Một số trường hợp thừa kế giữa người thân được miễn thuế thu nhập cá nhân, lệ phí trước bạ; hỏi cơ quan thuế khi nộp hồ sơ.",
      },
      {
        heading: "Có người ở xa, ở nước ngoài, hoặc không chịu ký",
        body: "Người thừa kế ở xa hoặc ở nước ngoài có thể ký văn bản ủy quyền, hoặc ký văn bản từ chối nhận di sản, tại cơ quan có thẩm quyền nơi họ ở (ở nước ngoài thường là cơ quan đại diện Việt Nam), rồi gửi về.\n\nNếu một người không đồng ý cách chia hoặc không chịu ký, văn phòng công chứng không thể công chứng văn bản thỏa thuận. Khi đó, người muốn chia có thể khởi kiện yêu cầu chia di sản tại tòa án khu vực nơi có nhà đất. Trước khi kiện, một buổi trao đổi có luật sư cùng ngồi thường giúp các bên hiểu phần của mình và tránh được vụ kiện kéo dài giữa anh chị em.",
      },
    ],
    sources: [
      {
        label:
          "Bộ luật Dân sự 2015 (số 91/2015/QH13): Điều 611, 612, 620, 623, 649, 650, 651, 652",
        url: search("91/2015/QH13"),
      },
      {
        label: "Luật Công chứng 2024 (số 46/2024/QH15)",
        url: search("46/2024/QH15"),
      },
      {
        label:
          "Luật Đất đai 2024 (số 31/2024/QH15): Điều 133 (đăng ký biến động)",
        url: search("31/2024/QH15"),
      },
    ],
  },
  {
    slug: "nguoi-than-bi-tam-giu-tai-dong-nai-gia-dinh-can-lam-gi",
    title:
      "Người thân bị tạm giữ ở Đồng Nai: gia đình cần làm gì trong những ngày đầu",
    summary:
      "Nhận tin người nhà bị bắt, bị tạm giữ: thời hạn tạm giữ, quyền có luật sư bào chữa ngay từ đầu, cách đăng ký bào chữa, gửi đồ, thăm gặp và những việc gia đình không nên làm.",
    keywords:
      "người thân bị bắt, bị tạm giữ, tạm giam, luật sư hình sự đồng nai, luật sư bào chữa biên hòa, đăng ký bào chữa, thăm gặp người bị tạm giam, bị công an bắt",
    seoTitle: "Người thân bị tạm giữ ở Đồng Nai: gia đình cần làm gì",
    seoDescription:
      "Người nhà bị tạm giữ, tạm giam ở Đồng Nai: thời hạn tạm giữ, quyền có luật sư từ đầu, đăng ký bào chữa, gửi đồ, thăm gặp và điều không nên làm.",
    categories: ["hinh-su"],
    services: ["hinh-su"],
    sections: [
      {
        heading: "Việc đầu tiên: hỏi rõ ba điều",
        body: 'Khi người nhà bị giữ, gia đình nên biết càng sớm càng tốt: cơ quan nào đang giữ (ví dụ Cơ quan Cảnh sát điều tra Công an thành phố Đồng Nai hay công an phường, xã), người đó bị giữ trong trường hợp nào (giữ người trong trường hợp khẩn cấp, bắt quả tang, bắt theo lệnh), và về hành vi gì.\n\nCơ quan đã giữ người có trách nhiệm thông báo cho gia đình. Hãy ghi lại tên cán bộ, số điện thoại, địa chỉ cơ quan và mọi giấy tờ được giao. Đừng nghe theo người lạ gọi điện tự xưng "lo được việc" và đòi chuyển tiền.',
      },
      {
        heading: "Tạm giữ được bao lâu",
        body: "Thời hạn tạm giữ không quá 3 ngày, kể từ khi cơ quan điều tra nhận người bị giữ. Trường hợp cần thiết có thể gia hạn, mỗi lần không quá 3 ngày, tối đa hai lần, tức tổng cộng không quá 9 ngày. Hết thời hạn mà không khởi tố thì phải trả tự do; nếu khởi tố bị can, cơ quan tố tụng có thể áp dụng tạm giam hoặc biện pháp khác như cấm đi khỏi nơi cư trú, bảo lĩnh, đặt tiền để bảo đảm.\n\nVì vậy, những ngày tạm giữ là giai đoạn quyết định. Lời khai đầu tiên thường được dùng suốt vụ án.",
      },
      {
        heading: "Quyền có luật sư ngay từ khi bị tạm giữ",
        body: "Người bị tạm giữ có quyền tự bào chữa hoặc nhờ người bào chữa ngay từ khi bị tạm giữ, không phải đợi đến khi ra tòa. Gia đình có thể thay mặt người bị giữ mời luật sư.\n\nLuật sư nộp văn bản đăng ký bào chữa kèm thẻ luật sư và giấy yêu cầu luật sư của người bị giữ hoặc người thân. Trong 24 giờ kể từ khi nhận đủ giấy tờ, cơ quan tiến hành tố tụng phải kiểm tra và, nếu không thuộc trường hợp từ chối, vào sổ đăng ký bào chữa và gửi thông báo cho luật sư. Sau đó luật sư được gặp người bị giữ, có mặt khi lấy lời khai và đọc biên bản.",
      },
      {
        heading: "Gửi đồ, gửi tiền và thăm gặp",
        body: "Người bị tạm giữ, tạm giam được nhận quà, đồ dùng và tiền gửi lưu ký theo danh mục và định mức của nhà tạm giữ, trại tạm giam. Hãy hỏi trực tiếp nơi giữ người về danh mục được nhận, giờ nhận và giấy tờ cần mang.\n\nThân nhân được thăm gặp theo Luật Thi hành tạm giữ, tạm giam: người bị tạm giữ được gặp thân nhân một lần trong mỗi thời hạn tạm giữ, người bị tạm giam được gặp một lần mỗi tháng, mỗi lần không quá một giờ, và phải được cơ quan đang thụ lý vụ án đồng ý. Mang theo căn cước và giấy tờ chứng minh quan hệ.",
      },
      {
        heading: "Những việc gia đình không nên làm",
        body: 'Không liên lạc, gây sức ép với người làm chứng hoặc người bị hại; việc này có thể bị coi là cản trở điều tra và làm tình hình xấu hơn.\n\nKhông xóa tin nhắn, không cất giấu, tẩu tán đồ vật, tài sản liên quan.\n\nKhông chuyển tiền cho người hứa "chạy án".\n\nKhông đăng thông tin vụ việc lên mạng xã hội.\n\nNếu vụ việc có thiệt hại cho người khác, việc khắc phục, bồi thường có thể là tình tiết giảm nhẹ, nhưng nên làm qua luật sư và có văn bản, biên nhận rõ ràng.',
      },
    ],
    sources: [
      {
        label:
          "Bộ luật Tố tụng hình sự 2015 (số 101/2015/QH13, đã sửa đổi): Điều 58, 59, 72, 78, 117, 118, 119",
        url: search("101/2015/QH13"),
      },
      {
        label:
          "Luật Thi hành tạm giữ, tạm giam 2015 (số 94/2015/QH13): Điều 22, 23",
        url: search("94/2015/QH13"),
      },
    ],
  },
  {
    slug: "doi-no-vay-tien-khong-tra-tai-dong-nai",
    title:
      "Cho vay tiền không trả ở Đồng Nai: chuẩn bị chứng cứ, khởi kiện hay tố giác",
    summary:
      "Cho người quen vay bằng giấy tay hoặc chuyển khoản, đến hạn không trả: chứng cứ nào có giá trị, lãi suất được đòi tối đa bao nhiêu, khi nào là vụ việc dân sự, khi nào có dấu hiệu hình sự, và nộp đơn ở đâu.",
    keywords:
      "đòi nợ, cho vay tiền không trả, vay tiền không trả, kiện đòi nợ đồng nai, giấy vay tiền viết tay, lãi suất cho vay, luật sư đòi nợ biên hòa, doi no, khởi kiện đòi tiền",
    seoTitle: "Cho vay tiền không trả ở Đồng Nai: kiện hay tố giác?",
    seoDescription:
      "Đòi lại tiền cho vay ở Đồng Nai: chứng cứ cần có, lãi suất tối đa, khi nào là tranh chấp dân sự, khi nào có dấu hiệu lừa đảo, và tòa án nào giải quyết.",
    categories: ["tranh-chap", "hop-dong"],
    services: ["giai-quyet-tranh-chap"],
    sections: [
      {
        heading: "Chứng cứ: thứ quyết định nhất",
        body: 'Vay tiền không bắt buộc lập văn bản, nhưng khi tranh chấp, bên cho vay phải chứng minh đã cho vay. Những chứng cứ thường dùng:\n\nGiấy vay tiền, giấy nhận tiền có chữ ký của người vay, kể cả viết tay.\n\nSao kê ngân hàng thể hiện chuyển khoản, càng tốt nếu nội dung chuyển khoản ghi rõ "cho vay".\n\nTin nhắn Zalo, Messenger, email mà người vay thừa nhận khoản nợ, hứa trả, xin khất.\n\nGhi âm cuộc nói chuyện. Khi nộp cho tòa cần kèm văn bản trình bày ghi âm được ở đâu, khi nào, với ai, và bản ghi lời nói.\n\nHãy sao lưu ngay. Chụp màn hình tin nhắn kèm thông tin tài khoản người gửi, không chỉ chụp phần nội dung.',
      },
      {
        heading: "Lãi suất được đòi bao nhiêu",
        body: "Lãi suất cho vay do các bên thỏa thuận nhưng không được vượt quá 20%/năm của khoản tiền vay. Phần vượt quá không có hiệu lực. Nếu có thỏa thuận trả lãi mà không rõ mức lãi, lãi được tính bằng 50% mức trần, tức 10%/năm.\n\nNgười vay trả chậm thì bên cho vay còn được yêu cầu trả lãi trên nợ gốc quá hạn. Cho vay với lãi suất gấp nhiều lần mức trần, có tính chất chuyên nghiệp, có thể bị xem xét về hình sự đối với chính bên cho vay.",
      },
      {
        heading: "Dân sự hay hình sự",
        body: "Phần lớn trường hợp vay không trả là tranh chấp dân sự: người vay có thật sự vay, nhưng làm ăn thua lỗ hoặc cố tình chây ì. Con đường đúng là khởi kiện ra tòa.\n\nVụ việc chỉ có dấu hiệu tội phạm khi, ví dụ, người vay dùng thủ đoạn gian dối ngay từ đầu (đưa thông tin giả, giấy tờ giả để vay), hoặc sau khi vay thì bỏ trốn, dùng tiền vào mục đích bất hợp pháp dẫn đến không trả được. Khi đó có thể làm đơn tố giác tới cơ quan công an.\n\nTố giác một tranh chấp dân sự thông thường không làm tiền về nhanh hơn; cơ quan công an sẽ hướng dẫn chuyển sang con đường dân sự, và bạn mất thêm thời gian.",
      },
      {
        heading: "Trước khi kiện: gửi yêu cầu bằng văn bản",
        body: "Gửi cho người vay văn bản yêu cầu trả nợ, ghi rõ số tiền gốc, lãi, thời hạn trả, gửi qua bưu điện có báo phát và qua tin nhắn. Văn bản này vừa là cơ hội cuối để thỏa thuận, vừa xác định thời điểm người vay biết mình bị đòi.\n\nNếu người vay đề nghị trả dần, hãy lập văn bản thỏa thuận có chữ ký, ghi lịch trả cụ thể.",
      },
      {
        heading: "Khởi kiện ở đâu và sau khi thắng kiện",
        body: "Đơn khởi kiện nộp tại tòa án khu vực nơi người vay cư trú, làm việc. Người vay ở các phường Biên Hòa cũ thì hiện thuộc Tòa án nhân dân khu vực 1 - Đồng Nai.\n\nNếu có căn cứ cho thấy người vay đang tẩu tán tài sản, có thể yêu cầu tòa áp dụng biện pháp khẩn cấp tạm thời như phong tỏa tài khoản, cấm chuyển dịch tài sản.\n\nBản án có hiệu lực mà người vay không tự nguyện trả thì gửi đơn yêu cầu cơ quan thi hành án dân sự thi hành, trong thời hạn 5 năm kể từ ngày bản án có hiệu lực. Bản án chỉ có giá trị thu tiền khi người vay có tài sản, nên ngay từ đầu hãy ghi lại những gì bạn biết về tài sản, nơi làm việc của họ.",
      },
    ],
    sources: [
      {
        label:
          "Bộ luật Dân sự 2015 (số 91/2015/QH13): Điều 463, 466, 468, 469, 470",
        url: search("91/2015/QH13"),
      },
      BO_LUAT_TO_TUNG,
      {
        label:
          "Bộ luật Hình sự 2015 (số 100/2015/QH13, đã sửa đổi): Điều 174, 175, 201",
        url: search("100/2015/QH13"),
      },
      {
        label: "Luật Thi hành án dân sự (thời hiệu yêu cầu thi hành án)",
        url: search("Luật Thi hành án dân sự"),
      },
    ],
  },
  {
    slug: "nhan-thong-bao-thu-ly-cua-toa-an-khi-bi-kien",
    title:
      "Nhận thông báo thụ lý của tòa án khi bị kiện: 15 ngày đầu cần làm gì",
    summary:
      "Nhận giấy của Tòa án khu vực ở Đồng Nai báo mình bị kiện: đọc giấy thế nào, thời hạn 15 ngày nộp ý kiến, quyền yêu cầu phản tố, vì sao không nên bỏ không đến tòa, và khi nào được ủy quyền cho người khác.",
    keywords:
      "bị kiện, thông báo thụ lý vụ án, giấy triệu tập của tòa, bị đơn, văn bản ý kiến, phản tố, luật sư bị đơn đồng nai, nhận giấy tòa án biên hòa",
    seoTitle: "Bị kiện, nhận thông báo thụ lý của tòa: làm gì trước?",
    seoDescription:
      "Nhận thông báo thụ lý của tòa án khu vực ở Đồng Nai: thời hạn 15 ngày nộp ý kiến, quyền phản tố, hậu quả nếu vắng mặt và cách ủy quyền tham gia.",
    categories: ["tranh-chap"],
    services: ["giai-quyet-tranh-chap"],
    sections: [
      {
        heading: "Đọc kỹ giấy tòa gửi",
        body: "Thông báo thụ lý vụ án cho biết: tòa án nào giải quyết, ai kiện bạn, kiện về việc gì, yêu cầu cụ thể (số tiền, tài sản, quan hệ), và kèm theo bản sao đơn khởi kiện, tài liệu nguyên đơn đã nộp. Hãy đối chiếu tên, địa chỉ của bạn, và ghi lại ngày nhận giấy: thời hạn được tính từ ngày này.\n\nNếu là giấy triệu tập, giấy báo đến phiên họp, xem ngày giờ, địa điểm và giấy tờ phải mang. Tòa án Biên Hòa trước đây nay là Tòa án nhân dân khu vực 1 - Đồng Nai, trụ sở số 1 Nguyễn Du, phường Trấn Biên.",
      },
      {
        heading: "15 ngày để nộp văn bản ý kiến",
        body: "Trong 15 ngày kể từ ngày nhận thông báo thụ lý, bị đơn phải nộp cho tòa văn bản ghi ý kiến về yêu cầu của nguyên đơn, kèm tài liệu, chứng cứ (nếu có). Cần thêm thời gian thì có thể đề nghị tòa gia hạn, nhưng không quá 15 ngày nữa.\n\nVăn bản ý kiến nên nói rõ: đồng ý phần nào, không đồng ý phần nào và vì sao, chứng cứ nào chứng minh. Đây là lúc trình bày có lợi nhất, vì tòa đọc văn bản này trước khi tổ chức hòa giải.",
      },
      {
        heading: "Quyền yêu cầu phản tố",
        body: "Nếu chính bạn cũng có yêu cầu với nguyên đơn trong cùng quan hệ (ví dụ bị kiện đòi tiền hàng nhưng hàng giao bị lỗi, bạn muốn đòi bồi thường), bạn có thể nộp yêu cầu phản tố để tòa giải quyết luôn trong vụ án.\n\nPhản tố phải nộp trước thời điểm mở phiên họp kiểm tra việc giao nộp, tiếp cận, công khai chứng cứ và hòa giải. Để muộn hơn, bạn phải kiện thành vụ khác.",
      },
      {
        heading: "Không đến tòa thì sao",
        body: "Nhiều người nghĩ không đến thì tòa không xử được. Không đúng: nếu bị đơn đã được triệu tập hợp lệ lần thứ hai mà vẫn vắng mặt không có lý do chính đáng, tòa vẫn xét xử vắng mặt. Khi đó tòa chỉ nghe một phía, và bạn mất cơ hội trình bày, hòa giải.\n\nNếu có lý do chính đáng không đến được (ốm đau, công tác xa), hãy báo cho tòa bằng văn bản kèm giấy tờ chứng minh, càng sớm càng tốt.",
      },
      {
        heading: "Ủy quyền cho người khác tham gia",
        body: "Trong phần lớn vụ án dân sự, kinh doanh thương mại, lao động, bạn có thể ủy quyền cho người khác, kể cả luật sư, thay mặt mình tham gia tố tụng. Văn bản ủy quyền nên được công chứng, chứng thực.\n\nNgoại lệ quan trọng: trong vụ việc ly hôn, đương sự không được ủy quyền cho người khác thay mặt mình. Luật sư vẫn có thể tham gia với tư cách người bảo vệ quyền và lợi ích hợp pháp, nhưng bạn phải tự mình có mặt.",
      },
    ],
    sources: [
      {
        label:
          "Bộ luật Tố tụng dân sự 2015 (số 92/2015/QH13, đã sửa đổi): Điều 85, 86, 196, 199, 200, 227",
        url: search("92/2015/QH13"),
      },
    ],
  },
  {
    slug: "dat-coc-mua-dat-bi-boi-coc-tai-dong-nai",
    title:
      "Đặt cọc mua đất ở Đồng Nai bị bội cọc: khi nào được phạt cọc, khi nào chỉ lấy lại tiền",
    summary:
      "Bên bán đổi ý không bán, hoặc bên mua không tiếp tục mua: quy định về phạt cọc, những trường hợp không phạt được vì đất không đủ điều kiện chuyển nhượng, và cách xử lý khi hợp đồng cọc viết tay.",
    keywords:
      "bội cọc, phạt cọc, đặt cọc mua đất, mất cọc, đòi lại tiền cọc, hợp đồng đặt cọc viết tay, tranh chấp đặt cọc đồng nai, luật sư đất đai biên hòa, boi coc",
    seoTitle: "Đặt cọc mua đất bị bội cọc ở Đồng Nai: phạt cọc thế nào",
    seoDescription:
      "Bên bán hoặc bên mua đất ở Đồng Nai không thực hiện hợp đồng đặt cọc: quy định phạt cọc, khi nào chỉ được trả lại tiền và cách xử lý cọc viết tay.",
    categories: ["dat-dai-nha-o", "hop-dong"],
    services: ["dat-dai-bat-dong-san", "giai-quyet-tranh-chap"],
    sections: [
      {
        heading: "Quy định chung về phạt cọc",
        body: "Theo Bộ luật Dân sự, nếu bên đặt cọc (thường là bên mua) từ chối việc giao kết, thực hiện hợp đồng thì mất khoản cọc. Nếu bên nhận cọc (thường là bên bán) từ chối thì phải trả lại khoản cọc và một khoản tiền tương đương giá trị cọc, trừ khi hai bên có thỏa thuận khác.\n\nNhiều hợp đồng cọc ở Đồng Nai thỏa thuận mức phạt gấp hai, gấp ba lần tiền cọc. Thỏa thuận này có thể được tòa chấp nhận nếu rõ ràng và tự nguyện, nhưng cần đọc kỹ từng câu chữ.",
      },
      {
        heading: "Khi nào không phạt được cọc",
        body: "Phạt cọc đặt ra khi một bên có lỗi từ chối giao kết. Nếu không ký được hợp đồng chuyển nhượng vì lý do khách quan, hoặc vì đất không đủ điều kiện chuyển nhượng, tòa thường buộc trả lại tiền cọc mà không phạt, hoặc xem xét lỗi của từng bên.\n\nĐất được chuyển nhượng khi, trong số các điều kiện: có giấy chứng nhận quyền sử dụng đất (trừ một số trường hợp luật cho phép), không có tranh chấp hoặc tranh chấp đã được giải quyết, không bị kê biên, áp dụng biện pháp bảo đảm thi hành án, và còn thời hạn sử dụng đất. Đất đang thế chấp ngân hàng, đất có người khác cùng đứng tên chưa đồng ý, đất nằm trong quy hoạch thu hồi là những tình huống hay gặp ở khu vực ven các dự án hạ tầng.",
      },
      {
        heading: "Cọc viết tay có giá trị không",
        body: "Luật không bắt buộc hợp đồng đặt cọc phải công chứng. Giấy cọc viết tay vẫn có giá trị nếu thể hiện rõ: các bên, thửa đất, giá mua bán, số tiền cọc, thời hạn ký hợp đồng chuyển nhượng, và hậu quả khi một bên không thực hiện.\n\nVấn đề thường gặp là giấy viết tay thiếu những nội dung đó, hoặc chỉ một người trong hai vợ chồng đứng tên ký nhận cọc trong khi đất là tài sản chung. Khi đó việc đòi phạt cọc khó hơn nhiều.",
      },
      {
        heading: "Bị bội cọc: nên làm gì",
        body: "Giữ nguyên bản giấy cọc, chứng từ chuyển tiền, tin nhắn trao đổi về việc ký hợp đồng.\n\nGửi văn bản yêu cầu bên kia thực hiện cam kết hoặc trả cọc và tiền phạt trong một thời hạn cụ thể.\n\nNếu không thỏa thuận được, khởi kiện tại tòa án khu vực nơi bị đơn cư trú. Tranh chấp hợp đồng đặt cọc không bắt buộc qua hòa giải ở Ủy ban nhân dân phường, xã.\n\nBên bán có dấu hiệu bán thửa đất cho người khác: có thể yêu cầu tòa áp dụng biện pháp khẩn cấp tạm thời để ngăn việc chuyển nhượng trong khi giải quyết.",
      },
      {
        heading: "Phòng ngừa trước khi đặt cọc",
        body: 'Kiểm tra thông tin thửa đất tại văn phòng đăng ký đất đai, xem quy hoạch, hỏi tình trạng thế chấp, xác định đủ những người phải ký. Ghi điều khoản xử lý cụ thể khi đất không đủ điều kiện chuyển nhượng. Bài "Kiểm tra pháp lý trước khi đặt cọc mua đất" trong mục Góc nhìn pháp lý trình bày chi tiết từng bước.',
      },
    ],
    sources: [
      {
        label: "Bộ luật Dân sự 2015 (số 91/2015/QH13): Điều 117, 328, 418",
        url: search("91/2015/QH13"),
      },
      {
        label:
          "Luật Đất đai 2024 (số 31/2024/QH15): Điều 45 (điều kiện thực hiện quyền chuyển nhượng)",
        url: search("31/2024/QH15"),
      },
      BO_LUAT_TO_TUNG,
    ],
  },
];
