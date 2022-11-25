import {HttpClient} from "@angular/common/http";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {API_URL} from "src/app/core/core-urls/api-url";
import {ArticleInput} from "src/app/models/blog/article-input";
import {BlogInput} from "src/app/models/blog/blog-input";
import {NewsInput} from "src/app/models/blog/news-input";
import {CreateUpdateBusinessInput} from "src/app/models/business/input/business-create-update-input";
import {CreateUpdateFranchiseInput} from "src/app/models/franchise/input/franchise-create-update-input";
import {CommonDataService} from "src/app/core/services/common/common-data.service";
import {FinData} from "src/app/shared/classes/fin-data";
import {FORM_ERRORS, FORM_PLACEHOLDERS, FORM_SUCCESS, FORM_VALIDATION_MESSAGES} from "src/app/shared/classes/form-data";
import {sumValidator} from "src/app/shared/classes/custom-validators";
import {Router} from "@angular/router";
import {ConfiguratorService} from "../../../core/services/configurator/configurator.service";
import {forkJoin, of, Subject} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {GetBlogsModel} from "../../../models";
import {CreateArticleModel} from "../../../models/blog/create-article.model";

@Component({
  selector: "app-configurator-admin",
  templateUrl: "./configurator-admin.component.html",
  styleUrls: ["./configurator-admin.component.scss"]
})

/**
 * Класс модуля конфигуратора (панель).
 */
export class ConfiguratorAdminComponent implements OnInit, OnDestroy {
  aMenuList: any[] = [];
  tabIndex: number = 0;
  selectedBlogAction: any;
  selectedNewsAction: any;
  aBlogActions: any[] = [];
  aBlogThemes: any[] = [];
  selectedBlogCodeTheme: string = "";
  blogFile: any;
  blogTitle: string = "";
  aBlogs: any[] = [];
  oEditBlog: any = {};
  oEditArticle: any = {};
  selectedBlog: any;
  selectedFranchise: any;
  selectedBusiness: any;
  selectedFranchiseId: number = 0;
  selectedBusinessId: number = 0;
  aArticleThemes: any[] = [];
  selectedTheme: any;
  articleTitle: string = "";
  articleDescription: string = "";
  previewFile: any;
  articleText: string = "";
  articleFile: any;
  signature: string = "";
  selectedBlogId: number = 0;
  shortArticleDescription: string = "";
  isNew: boolean = false;
  aCardActions: any[] = [];
  logoName?: string;
  responsiveOptions: any;
  aNamesFranchisePhotos: any = [];
  aFiles: any[] = [];
  lead: any;
  generalInvest?: number;
  lumpSumPayment?: number;
  royalty?: number;
  royaltyPack?: number;
  payback: any;
  profitMonth?: number;
  launchDate?: number;
  priceInvest?: string;
  nameInvest?: string;
  baseDate?: number;
  yearStart?: number;
  dotCount?: number;
  businessCount?: number;
  peculiarity: any;
  isHidePacks?: boolean;
  packName?: string;
  packDetails?: string;
  packLumpSumPayment?: string;
  isGarant: boolean = false;
  fileLogoFormData?: any;
  franchisePhotos: any;
  fileEducationFormData: any;
  activityDetail: any;
  featureFranchise?: string;
  defailsFranchise: any;
  paymentDetails?: string;
  namesIndicators?: string;
  finIndicator1?: string;
  finIndicator2?: string;
  finIndicator3?: string;
  finIndicator4?: string;
  percentFinancial1?: number;
  percentFinancial2?: number;
  percentFinancial3?: number;
  percentFinancial4?: number;
  educationDetails?: string;
  totalInvest?: number;
  videoLink: any;
  modelFile: any;
  presentFile: any;
  ainvestIn: any;
  ind: number = 0;
  aPacks: any;
  pInd: number = 0;
  fio: string = "";
  routeParamCategory: any;
  routeParamSubCategory: any;
  routeParamSubCity: any;
  selectedCardAction: any;
  aFranchises: any[] = [];
  aBusinessList: any[] = [];
  franchiseId: number = 0;
  franchiseData: any = [];
  routeParam: any;
  aInvestInclude: any = [];
  aFinIndicators: any[] = [];
  aFranchisePhotos: any[] = [];
  aNamesBusinessPhotos: any = [];
  // payback: number = 0;
  priceIn: number = 0;
  nameIn = "";
  aPriceIn: any;
  price: number = 0;
  turnPrice: number = 0;
  profitPrice: number = 0;
  profitability: number = 0;
  businessAge: number = 0;
  employeeYearCount: number = 0;
  form: string = "";
  share: number = 0;
  site: string = "";
  text: string = "";
  assets: string = "";
  filesAssetsFormData: any;
  reasonsSale: string = "";
  address: string = "";
  isHideVideo: boolean = false;
  businessName: string = "";
  activityPhotoName: any;
  filesAssets: any;
  filesAssetsCounter!: number;
  filesReasonsSale: any;
  filesTextBusiness: any;
  filesBusiness: any;
  routeParamCity: any;
  selectedRowIndexFranchise: number = 0;
  selectedRowIndexBusiness: number = 0;

  // formLabels = FORM_LABELS;
  formPlaceholders = FORM_PLACEHOLDERS;
  formSuccess = FORM_SUCCESS;
  formErrors: any = FORM_ERRORS;
  validationMessages: any = FORM_VALIDATION_MESSAGES;

  finDataForm!: FormGroup;

  // price!: AbstractControl;
  // turnPrice!: AbstractControl;
  // profitPrice!: AbstractControl;
  // profitability!: AbstractControl;
  // businessAge!: AbstractControl;
  businessId: number = 0;
  businessData: any = [];
  aBusinessPhotos: any = [];
  selectedBlogArticleId: any;
  isEditArticle: boolean = false;
  finData: FinData = new FinData('', '', '', '', '', '');
  aBlogArticles: any[] = [];
  selectedBlogArticle: any;
  aNewsActions: any[] = [];
  aSphereCategoryActions: any[] = [];
  newsFile: any;
  newsTitle: string = "";
  typeNews: any;
  textNews: string = "";
  oNews: any = {};
  selectedNews: any;
  aNews: any[] = [];
  selectedCardActionSysName: any;
  aNotAcceptedFranchises: any[] = [];
  franchiseRowIndex: number = 0;
  isShowRejectFranchiseModal: boolean = false;
  isShowRejectBusinessModal: boolean = false;
  commentRejected: string = "";
  aFranchiseCategories: any;
  aFranchiseSubCategories: any;
  selectedCategory: any;
  aBusinessSubCategories: any;
  selectedSubCategory: any;
  selectedCityName: any;
  aCities: any;
  aBusinessCategories: any;
  selectedSphereCategoryAction: any;
  sphereAction: any;
  sphereName: string = "";
  sysName: string = "";
  typeSphere: string = "";

  public readonly notAcceptedBusinesses$ = this.configuratorService.notAcceptedBusinesses$;
  private readonly unsub$ = new Subject<void>();
  public readonly createdSphere$ = this.configuratorService.createdSphere$;

  constructor(private http: HttpClient,
              private messageService: MessageService,
              private commonService: CommonDataService,
              private formBuilder: FormBuilder,
              private router: Router,
              private readonly configuratorService: ConfiguratorService) {

    // TODO: переделать на вывод с бэка.
    this.aCardActions = [
      {cardActionSysName: "CreateFranchise", cardActionName: "Создать франшизу"},
      {cardActionSysName: "CreateBusiness", cardActionName: "Создать бизнес"},
      {cardActionSysName: "ChangeFranchise", cardActionName: "Изменить франшизу"},
      {cardActionSysName: "ChangeBusiness", cardActionName: "Изменить бизнес"}
    ];

    this.aNewsActions = [
      {newsActionSysName: "CreateNews", newsActionName: "Создать новость"},
      {newsActionSysName: "ChangeNews", newsActionName: "Изменить новость"}
    ];

    this.aSphereCategoryActions = [
      {sphereActionSysName: "CreateSphere", sphereActionName: "Создать сферу"},
      {sphereActionSysName: "CreateCategory", sphereActionName: "Создать категорию"}
    ];

    this.responsiveOptions = [
      {breakpoint: '1024px', numVisible: 5},
      {breakpoint: '768px', numVisible: 3},
      {breakpoint: '560px', numVisible: 1}
    ];

    // Первоначальная инициализация инвестиций.
    this.ainvestIn = [{Name: "", Price: "", isHideInvest: false}];

    // Первоначальная инициализация пакетов.
    this.aPacks = [{Name: "", Text: "", LumpSumPayment: "", Royalty: "", TotalInvest: "", IsHidePack: false}];

    this.aPriceIn = [{Name: "", Price: "", isHide: false}];

    console.log("ainvestIn", this.ainvestIn);
    console.log("aPacks", this.aPacks);
  };

  public ngOnInit() {
    this.loadMenuItemsAsync();
    //  this.getUserFio();
    this.buildForm();
    this.getNotAcceptedFranchisesAsync();

    forkJoin([this.configuratorService.getNotAcceptedBusinesses()]).subscribe();
    console.log("notAcceptedBusinesses$", this.notAcceptedBusinesses$);
    this.GetFranchiseCategoriesListAsync();
    this.getBusinessDataAsync();
    this.getCitiesAsync();
  };

  public ngOnAfterViewInit() {
    this.aBusinessPhotos = this.aNamesBusinessPhotos;
    console.log("aBusinessPhotos", this.aBusinessPhotos);
  };

  /**
   * Функция получит список действий для работы с блогами.
   * @returns - Список действий.
   */
  private loadBlogActions() {
    this.http.get(API_URL.apiUrl.concat("/configurator/blog-actions"))
      .subscribe((response: any) => this.aBlogActions = response, (err) => {
        throw new Error(err);
      });
  };

  /**
   * Функция получит список меню конфигуратора.
   * @returns - Список элементов меню.
   */
  private loadMenuItemsAsync() {
    this.http.get(API_URL.apiUrl.concat("/configurator/menu-items"))
      .subscribe((response: any) => this.aMenuList = response, (err) => {
        throw new Error(err);
      });
  };

  /**
   * Функция создаст новый блог.
   * @returns - Данные нового блога.
   */
  public onCreateBlogAsync() {

    if (this.selectedBlogCodeTheme == "" || this.blogTitle == "") {
      return;
    }

    let blogInput = new BlogInput();
    blogInput.Title = this.blogTitle;
    blogInput.ThemeCategoryCode = this.selectedBlogCodeTheme;
    let formData = new FormData();

    formData.append("blogData", JSON.stringify(blogInput));
    formData.append("images", this.blogFile);

    if (blogInput.Title != "" && blogInput.ThemeCategoryCode != "") {
      this.http.post(API_URL.apiUrl.concat("/blog/create-blog"), formData)
        .subscribe((response: any) => this.messageService.add({
          severity: 'success',
          summary: 'Успешно!',
          detail: 'Успешно сохранено'
        }), (err) => {
          throw new Error(err);
        });
    }
  };

  /**
   * Функция получит список тем блогов.
   * @returns - Список тем блогов.
   */
  private getBlogThemesAsync() {
    this.http.post(API_URL.apiUrl.concat("/blog/blog-themes"), {})
      .subscribe((response: any) => this.aBlogThemes = response, (err) => {
        throw new Error(err);
      });
  };

  /**
   * Функция действий в зависимости от выбранного таба.
   * @param e - Событие таба.
   */
  public onChangeTab(e: any) {
    console.log(e);
    this.tabIndex = e.index;

    switch (this.tabIndex) {
      case 0:
        this.getNewsAsync();
        break;

      case 1:
        this.loadBlogActions();
        this.getBlogThemesAsync();
        this.getBlogsAsync();
        this.loadArticleThemesAsync();
        break;
    }
  };

  public uploadFileBlogAsync(e: any) {
    console.log("uploadFileBlogAsync");
    this.blogFile = e.target.files[0];
    console.log("blogFile", this.blogFile);
  };

  public uploadFileNewsAsync(e: any) {
    console.log("uploadFileNewsAsync");
    this.newsFile = e.target.files[0];
    console.log("newsFile", this.newsFile);
  };

  public uploadFilePreviewAsync(e: any) {
    console.log("uploadFilePreviewAsync");
    this.previewFile = e.target.files[0];
    console.log("previewFile", this.previewFile);
  };

  public uploadFileArticleAsync(e: any) {
    console.log("uploadFilePreviewAsync");
    this.articleFile = e.target.files[0];
    console.log("articleFile", this.articleFile);
  };

  public onSelectBlogTheme(e: any) {
    console.log(e);
    this.selectedBlogCodeTheme = e.themeCategoryCode;
  };

  private getBlogsAsync() {
    this.commonService.onGetBlogsAsync().subscribe((data: any) => this.aBlogs = data);
  };

  /**
   * Функция получит список тем для статей.
   * @returns - Список тем статей.
   */
  private loadArticleThemesAsync() {
    this.http.get(API_URL.apiUrl.concat("/blog/get-article-themes"))
      .subscribe((response: any) => this.aArticleThemes = response, (err) => {
        throw new Error(err);
      });
  };

  /**
   *  Функция создаст новую статью блога.
   * @param selectedBlogId
   * @param selectedTheme
   * @param articleTitle
   * @param shortArticleDescription
   * @param articleDescription
   * @param signature
   */
  public onCreateArticleAsync(selectedBlogId: number, selectedTheme: any, articleTitle: string, shortArticleDescription: string, articleDescription: string, signature: string) {
    let formData = new FormData();
    formData.append("previewFile", this.previewFile);
    formData.append("articleFile", this.articleFile);

    // let articleInput = new ArticleInput();
    // articleInput.Title = articleTitle;
    // articleInput.BlogId = selectedBlogId;
    // articleInput.ThemeCode = this.selectedTheme;
    // articleInput.Description = shortArticleDescription;
    // articleInput.Text = articleDescription;
    // articleInput.SignatureText = signature;
    let articleInput = {
    title: articleTitle,
    blogId: selectedBlogId,
    themeCode: this.selectedTheme,
    description: shortArticleDescription,
    text: articleDescription,
    signatureText: signature,
    } as CreateArticleModel;

    formData.append("articleData", JSON.stringify(articleInput));

    this.http.post(API_URL.apiUrl.concat("/blog/create-article"), formData)
      .subscribe((response: any) => {
        console.log(response);
      }, (err) => {
        throw new Error(err);
      });
  };

  public onSelectBlog(e: any, isNew: boolean, isEditArticle: boolean) {
    console.log("onSelectBlog", e);
    this.selectedBlogId = e.value.blogId;
    this.isNew = isNew;

    if (!this.isNew && !isEditArticle) {
      this.getEditBlogAsync(this.selectedBlogId);
    }

    if (isEditArticle) {
      this.getBlogArticlesAsync(this.selectedBlogId);
    }
  };

  public onSelectBlogArticle(e: any, isNew: boolean) {
    //  this.getEditBlogArticleAsync(this.selectedBlogArticleId);
    this.selectedBlogArticleId = e.value.articleId;
    console.log("onSelectBlogArticle", e);
    this.selectedBlogArticleId = e.value.articleId;

    if (!isNew) {
      // this.selectedBlogId
      this.getEditBlogArticleAsync(this.selectedBlogArticleId);
    }
  };

  public onSelectThemeArticle(e: any) {
    console.log("onSelectThemeArticle", e);
    this.selectedTheme = e.value.themeCode;
    console.log("selectedTheme", this.selectedTheme);
  };

  public onSelectNews(e: any, isNew: boolean) {
    this.selectedNews = e.value.newsId;
    console.log("selectedNews", e);
    this.selectedNews = e.value.newsId;

    if (!isNew) {
      this.getEditNewsAsync(this.selectedNews);
    }
  };

  /**
   * Функция получит блог для изменения.
   * @returns - Данные блога.
   */
  private getEditBlogAsync(blogId: number) {
    if (+this.selectedBlog.blogId > 0 && !this.isNew) {
      this.http.get(API_URL.apiUrl.concat("/blog/get-blog?blogId=" + blogId))
        .subscribe((response: any) => {
          console.log("Блог для изменения: ", response);
          // this.oEditBlog = response;
          // this.selectedBlog.isPaid = response.isPaid;
          this.blogTitle = response.title;
          // this.selectedBlog.url = response.url;
        }, (err) => {
          throw new Error(err);
        });
    }
  };

  /**
   * Функция изменит блог.
   * @returns - Измененные данные блога.
   */
  public onEditBlogAsync() {
    if (this.selectedBlogCodeTheme == "" || this.blogTitle == "") {
      return;
    }

    let blogInput = new BlogInput();
    blogInput.Title = this.blogTitle;
    blogInput.ThemeCategoryCode = this.selectedBlogCodeTheme;
    blogInput.BlogId = this.selectedBlogId;
    let formData = new FormData();

    formData.append("blogData", JSON.stringify(blogInput));
    formData.append("images", this.blogFile);

    if (blogInput.Title != "" && blogInput.ThemeCategoryCode != "") {
      this.http.put(API_URL.apiUrl.concat("/blog/update-blog"), formData)
        .subscribe(
          (response: any) => this.messageService.add({
            severity: 'success',
            summary: 'Успешно!',
            detail: 'Успешно изменено'
          }),
          (err) => {
            throw new Error(err);
          });
    }
  };

  public uploadFranchisePhotosAsync(event: any) {
    let fileList = event.target.files;
    let formData: FormData = new FormData();

    for (let i = 0; i < fileList.length; i++) {
      formData.append('files', fileList[i]);
    }
    this.http.post(API_URL.apiUrl.concat("/configurator/temp-file"), formData)
      .subscribe((response: any) => {
        console.log("Загруженные файлы франшизы:", response);
        this.aNamesFranchisePhotos = response;
      }, (err) => {
        throw new Error(err);
      });
  };

  /**
   * Функция создаст новую франшизу.
   * @returns - Данные созданной франшизы.
   */
  public onCreateFranchiseAsync() {
    console.log("onCreateFranchiseAsync");
    let createUpdateFranchiseInput = new CreateUpdateFranchiseInput();
    let logoName = this.logoName;
    let lead = this.lead;
    let generalInvest = this.generalInvest;
    let royalty = this.royalty;
    let payback = this.payback;
    let profitMonth = this.profitMonth;
    let launchDate = this.launchDate;
    let activityDetail = this.activityDetail;
    let baseDate = this.baseDate;
    let yearStart = this.yearStart;
    let dotCount = this.dotCount;
    let businessCount = this.businessCount;
    let featureFranchise = this.featureFranchise;
    let defailsFranchise = this.defailsFranchise;
    let paymentDetails = this.paymentDetails;
    let namesIndicators = this.namesIndicators;
    let finIndicator1 = this.finIndicator1;
    let finIndicator2 = this.finIndicator2;
    let finIndicator3 = this.finIndicator3;
    let finIndicator4 = this.finIndicator4;
    let percentFinancial1 = this.percentFinancial1;
    let percentFinancial2 = this.percentFinancial2;
    let percentFinancial3 = this.percentFinancial3;
    let percentFinancial4 = this.percentFinancial4;
    let educationDetails = this.educationDetails;
    let videoLink = this.videoLink;
    let isGarant = this.isGarant || false;

    // Формирование json фин.индикаторов.
    let namesIndicatorsJson = [
      {Name: finIndicator1, Price: percentFinancial1},
      {Name: finIndicator2, Price: percentFinancial2},
      {Name: finIndicator3, Price: percentFinancial3},
      {Name: finIndicator4, Price: percentFinancial4}
    ];

    // Если не добавляли записи и осталась лежать одна пустая.
    if (!this.ainvestIn[0].Name || !this.ainvestIn[0].Price) {
      this.ainvestIn[0].Name = this.nameInvest;
      this.ainvestIn[0].Price = this.priceInvest;
    } else {
      this.ainvestIn.push({Name: this.nameInvest, Price: this.priceInvest});
    }

    // Уберет пустые записи.
    this.ainvestIn = this.ainvestIn.filter((item: any) => item.Name !== "" && item.Price !== "");

    if (!this.aPacks[0].Name
      || !this.aPacks[0].Text
      || !this.aPacks[0].LumpSumPayment
      || !this.aPacks[0].Royalty
      || !this.aPacks[0].TotalInvest) {
      this.aPacks[0].Name = this.packName;
      this.aPacks[0].Text = this.packDetails;
      this.aPacks[0].LumpSumPayment = this.packLumpSumPayment;
      this.aPacks[0].Royalty = this.royaltyPack;
      this.aPacks[0].TotalInvest = this.totalInvest;
    } else {
      this.aPacks.push({
        Name: this.packName,
        Text: this.packDetails,
        LumpSumPayment: this.packLumpSumPayment,
        Royalty: this.royaltyPack,
        TotalInvest: this.totalInvest
      });
    }

    // Уберет пустые записи.
    this.aPacks = this.aPacks.filter((item: any) => item.Name !== ""
      && item.Text !== ""
      && item.LumpSumPayment !== ""
      && item.Royalty !== ""
      && item.TotalInvest !== "");

    // Уберет ключи флагов.
    let newainvestIn = this.ainvestIn.map((item: any) => ({Name: item.Name, Price: item.Price}));

    let investInJsonString = JSON.stringify(newainvestIn);

    let namesIndicatorsJsonString = JSON.stringify(namesIndicatorsJson);

    // Уберет ключи флагов.
    let newPacks = this.aPacks.map((item: any) => ({
      Name: item.Name,
      Text: item.Text,
      LumpSumPayment: item.LumpSumPayment,
      Royalty: item.Royalty,
      TotalInvest: item.TotalInvest
    }))

    let packetJsonString = JSON.stringify(newPacks);
    createUpdateFranchiseInput.Status = lead;
    createUpdateFranchiseInput.GeneralInvest = generalInvest;
    createUpdateFranchiseInput.LumpSumPayment = this.lumpSumPayment;
    createUpdateFranchiseInput.Royalty = royalty;
    createUpdateFranchiseInput.Payback = payback;
    createUpdateFranchiseInput.ProfitMonth = profitMonth;
    createUpdateFranchiseInput.LaunchDate = launchDate;
    createUpdateFranchiseInput.ActivityDetail = activityDetail;
    createUpdateFranchiseInput.BaseDate = baseDate;
    createUpdateFranchiseInput.YearStart = yearStart;
    createUpdateFranchiseInput.DotCount = dotCount;
    createUpdateFranchiseInput.BusinessCount = businessCount;
    createUpdateFranchiseInput.Peculiarity = featureFranchise;
    createUpdateFranchiseInput.Text = defailsFranchise;
    createUpdateFranchiseInput.PaymentDetail = paymentDetails;
    createUpdateFranchiseInput.UrlVideo = videoLink;
    createUpdateFranchiseInput.IsGarant = isGarant;
    createUpdateFranchiseInput.InvestInclude = investInJsonString;
    createUpdateFranchiseInput.FinIndicators = namesIndicatorsJsonString;
    createUpdateFranchiseInput.NameFinIndicators = namesIndicators;
    createUpdateFranchiseInput.FranchisePacks = packetJsonString;
    createUpdateFranchiseInput.IsNew = true;
    createUpdateFranchiseInput.Title = logoName;
    createUpdateFranchiseInput.TrainingDetails = educationDetails;
    createUpdateFranchiseInput.Category = this.selectedCategory;
    createUpdateFranchiseInput.SubCategory = this.selectedSubCategory;

    // TODO: тут сделать выбор сферы и катеории из списков.
    createUpdateFranchiseInput.SubCategory = this.routeParamSubCategory;
    createUpdateFranchiseInput.UrlsFranchise = this.aNamesFranchisePhotos;

    let sendFormData = new FormData();
    sendFormData.append("franchiseDataInput", JSON.stringify(createUpdateFranchiseInput));
    sendFormData.append("filesLogo", this.fileLogoFormData);
    sendFormData.append("urlsDetails", this.franchisePhotos);
    sendFormData.append("trainingPhoto", this.fileEducationFormData);
    sendFormData.append("finModelFile", this.modelFile);
    sendFormData.append("presentFile", this.presentFile);
    sendFormData.append("franchiseFile", this.presentFile);
    this.http.post(API_URL.apiUrl.concat("/configurator/create-update-franchise"), sendFormData)
      .subscribe((response: any) => {
        console.log("Франшиза успешно создана:", response);

        this.showMessageAfterSuccessCreateFranchise();

        setTimeout(() => {
          this.router.navigate(["/franchise/view"], {queryParams: {franchiseId: response.franchiseId, mode: "view"}});
        }, 2000);
      }, (err) => {
        throw new Error(err);
      });
  };

  /**
   * Функция добавит файл лого франшизы.
   */
  public uploadFranchiseLogoAsync(event: any) {
    event.stopPropagation();
    this.fileLogoFormData = event.target.files[0];
    console.log("uploadFranchiseLogoAsync", this.fileLogoFormData);
  };

  /**
   * Функция добавит файл обучения.
   */
  public uploadEducationPhotosAsync(event: any) {
    console.log("uploadEducationPhotosAsync");
    this.fileEducationFormData = event.target.files[0];
  };

  /**
   * Функция добавит фото франшизы.
   */
  public uploadFranchisePhotosBeforeSaveAsync(event: any) {
    console.log("uploadFranchisePhotosBeforeSaveAsync");
    this.franchisePhotos = event.target.files[0];
  };

  /**
   * Функция добавит файл фин.модели.
   */
  public uploadFinModelAsync(event: any) {
    console.log("uploadFinModelAsync");
    this.modelFile = event.target.files[0];
  };

  /**
   * Функция добавит файл презентации.
   */
  public uploadPresentAsync(event: any) {
    console.log("uploadPresentAsync");
    this.presentFile = event.target.files[0];
  };

  /**
   * Функция покажет сообщение об успешном создании франшизы.
   */
  private showMessageAfterSuccessCreateFranchise() {
    this.messageService.add({severity: 'success', summary: 'Успешно!', detail: 'Франшиза успешно создана'});
  };

  /**
   * Функция нарастит блоки с данными входит в инвестиции.
   * @param priceInvest - цена.
   * @param nameInvest - название.
   */
  public onAddInveest(priceInvest: any, nameInvest: any) {
    if (this.ainvestIn.length == 1) {
      this.ainvestIn[0] = {Name: nameInvest, Price: priceInvest};
      this.ainvestIn.push({Name: "", Price: ""});
      this.ainvestIn[this.ind].isHideInvest = true;
      this.ind++;
      return;
    }
    this.ainvestIn[this.ind].Name = nameInvest;
    this.ainvestIn[this.ind].Price = priceInvest;
    this.ainvestIn.push({Name: "", Price: ""});
    this.ainvestIn[this.ind].isHideInvest = true;
    this.ind++;
  };

  /**
   * Функция нарастит блоки с пакетами.
   * @param packName - название пакета.
   * @param packDetails - детали пакета.
   * @param packLumpSumPayment - паушальный взнос.
   * @param royaltyPack - роялти.
   * @param totalInvest - всего инвестиций.
   */
  public onAddPack(packName: any, packDetails: any, packLumpSumPayment: any, royaltyPack: any, totalInvest: any) {
    if (this.aPacks.length == 1) {
      this.aPacks[0] = {
        Name: packName,
        Text: packDetails,
        LumpSumPayment: packLumpSumPayment,
        Royalty: royaltyPack,
        TotalInvest: totalInvest
      };
      this.aPacks.push({Name: "", Text: "", LumpSumPayment: "", Royalty: "", TotalInvest: ""});
      this.aPacks[this.pInd].IsHidePack = true;
      this.pInd++;
      return;
    }

    this.aPacks[this.pInd].Name = packName;
    this.aPacks[this.pInd].Text = packDetails;
    this.aPacks[this.pInd].LumpSumPayment = packLumpSumPayment;
    this.aPacks[this.pInd].Royalty = royaltyPack;
    this.aPacks[this.pInd].TotalInvest = totalInvest;

    this.aPacks.push({Name: "", Text: "", LumpSumPayment: "", Royalty: "", TotalInvest: ""});
    this.aPacks[this.ind].IsHidePack = true;
    this.pInd++;

    console.log("packs", this.aPacks);
  };

  public onCheckedGarant() {
    console.log("isGarant", this.isGarant);
  };

  // private  getUserFio() {
  //     try {
  //          this.http.post(API_URL.apiUrl.concat("/user/user-fio"), {})
  //             .subscribe({
  //                 next: (response: any) => {
  //                     console.log("fio data:", response);
  //                     this.fio = response.fullName;
  //                 },

  //                 error: (err) => {
  //                     this.commonService.routeToStart(err);
  //                     throw new Error(err);
  //                 }
  //             });
  //     }

  //     catch (e: any) {
  //         throw new Error(e);
  //     }
  // };

  public onSelectCardAction() {
    console.log("cardAction", this.selectedCardAction);
    // this.selectedCardAction = cardAction.cardActionSysName;
    this.selectedCardActionSysName = this.selectedCardAction.cardActionSysName;

    if (this.selectedCardActionSysName == "ChangeFranchise") {
      this.getFranchisesListAsync();
    }

    if (this.selectedCardActionSysName == "ChangeBusiness") {
      this.getBusinessListAsync();
    }
  };

  /**
   * TODO: вынести в общий сервис.
   * Функция получит список франшиз.
   */
  private getFranchisesListAsync() {
    this.http.post(API_URL.apiUrl.concat("/franchise/catalog-franchise"), {})
      .subscribe((response: any) => {
        this.aFranchises = response;
        console.log("Список франшиз:", response);
      }, (err) => {
        throw new Error(err);
      });
  };

  /**
   * TODO: Вынести в общий сервис.
   * Функция получит список бизнеса.
   */
  private getBusinessListAsync() {
    this.http.post(API_URL.apiUrl.concat("/business/catalog-business"), {})
      .subscribe((response: any) => {
        console.log("Список бизнеса:", response);
        this.aBusinessList = response;
      }, (err) => {
        throw new Error(err);
      });
  };

  public onSelectFranchise(e: any, isNew: boolean) {
    console.log("onSelectFranchise", e);
    this.selectedFranchiseId = e.value.franchiseId;
    this.isNew = isNew;

    if (!this.isNew) {
      this.getEditFranchiseAsync(this.selectedFranchiseId);
    }
  };

  public onSelectBusiness(e: any, isNew: boolean) {
    console.log("onSelectBusiness", e);
    this.selectedBusinessId = e.value.businessId;
    this.isNew = isNew;

    if (!this.isNew) {
      this.getEditBusinessAsync(this.selectedBusinessId);
    }
  };

  /**
   * Функция получит франшизу для изменения.
   * @returns - Данные франшизы.
   */
  private getEditFranchiseAsync(franchiseId: number) {
    if (+this.selectedFranchise.franchiseId > 0 && !this.isNew) {
      this.http.get(API_URL.apiUrl.concat(`/configurator/get-franchise?franchiseId=${franchiseId}`))
        .subscribe((response: any) => {
          this.franchiseData = response;
          this.aInvestInclude = [JSON.parse(response.investInclude)];
          this.aFinIndicators = [JSON.parse(response.finIndicators)];
          this.aPacks = [JSON.parse(response.franchisePacks)];
        }, (err) => {
          throw new Error(err);
        });
    }
  };

  /**
   * Функция изменит франшизу.
   * @returns - Данные созданной франшизы.
   */
  public onEditFranchiseAsync() {
    console.log("onEditFranchiseAsync");
    console.log("log franchiseData", this.franchiseData);
    let newFranchiseData = this.franchiseData;

    let createUpdateFranchiseInput = new CreateUpdateFranchiseInput();
    let logoName = this.logoName;
    // let logoFormData = this.fileLogoFormData;
    let franchiseFiles = this.franchisePhotos;
    let lead = this.lead;
    let generalInvest = this.generalInvest;
    let royalty = this.royalty;
    let payback = this.payback;
    let profitMonth = this.profitMonth;
    let launchDate = this.launchDate;
    let activityDetail = this.activityDetail;
    let priceInvest = this.priceInvest;
    let nameInvest = this.nameInvest;
    let baseDate = this.baseDate;
    let yearStart = this.yearStart;
    let dotCount = this.dotCount;
    let businessCount = this.businessCount;
    let featureFranchise = this.featureFranchise;
    let defailsFranchise = this.defailsFranchise;
    let paymentDetails = this.paymentDetails;
    let namesIndicators = this.namesIndicators;
    let finIndicator1 = this.finIndicator1;
    let finIndicator2 = this.finIndicator2;
    let finIndicator3 = this.finIndicator3;
    let finIndicator4 = this.finIndicator4;
    let percentFinancial1 = this.percentFinancial1;
    let percentFinancial2 = this.percentFinancial2;
    let percentFinancial3 = this.percentFinancial3;
    let percentFinancial4 = this.percentFinancial4;
    let educationDetails = this.educationDetails;
    // let fileEducationFormData = this.fileEducationFormData;
    let packName = this.packName;
    let packDetails = this.packDetails;
    let packLumpSumPayment = this.packLumpSumPayment;
    let totalInvest = this.totalInvest;
    let videoLink = this.videoLink;
    let isGarant = this.isGarant || false;

    // Формирование json входит в инвестиции.
    // TODO: переделать на динамическое кол-во блоков.
    let investInJson = {
      Name: nameInvest,
      Price: priceInvest
    };

    // Формирование json фин.индикаторов.
    let namesIndicatorsJson = [
      {Name: finIndicator1, Price: percentFinancial1},
      {Name: finIndicator2, Price: percentFinancial2},
      {Name: finIndicator3, Price: percentFinancial3},
      {Name: finIndicator4, Price: percentFinancial4}
    ];

    // Формирование json пакетов.
    // TODO: переделать на динамическое кол-во блоков с пакетами.
    let packetJson = [
      {
        Name: packName,
        Text: packDetails,
        LumpSumPayment: packLumpSumPayment,
        Royalty: this.royaltyPack,
        TotalInvest: totalInvest
      }
    ];

    let investInJsonString = JSON.stringify(investInJson);
    let namesIndicatorsJsonString = JSON.stringify(namesIndicatorsJson);
    let packetJsonString = JSON.stringify(packetJson);

    // createUpdateFranchiseInput.fileLogo = logoFormData;;
    // createUpdateFranchiseInput.franchisePhoto = franchiseFiles;
    createUpdateFranchiseInput.Status = newFranchiseData.status;
    createUpdateFranchiseInput.GeneralInvest = newFranchiseData.generalInvest;
    createUpdateFranchiseInput.LumpSumPayment = newFranchiseData.lumpSumPayment;
    createUpdateFranchiseInput.Royalty = newFranchiseData.royalty;
    createUpdateFranchiseInput.Payback = newFranchiseData.payback;
    createUpdateFranchiseInput.ProfitMonth = newFranchiseData.profitMonth;
    createUpdateFranchiseInput.LaunchDate = newFranchiseData.launchDate;
    createUpdateFranchiseInput.ActivityDetail = newFranchiseData.activityDetail;
    createUpdateFranchiseInput.BaseDate = newFranchiseData.baseDate;
    createUpdateFranchiseInput.YearStart = newFranchiseData.yearStart;
    createUpdateFranchiseInput.DotCount = newFranchiseData.dotCount;
    createUpdateFranchiseInput.BusinessCount = newFranchiseData.businessCount;
    createUpdateFranchiseInput.Peculiarity = newFranchiseData.peculiarity;
    createUpdateFranchiseInput.Text = newFranchiseData.text;
    createUpdateFranchiseInput.PaymentDetail = newFranchiseData.paymentDetail;
    // createUpdateFranchiseInput.trainingPhoto = fileEducationFormData;
    createUpdateFranchiseInput.UrlVideo = newFranchiseData.urlVideo;
    createUpdateFranchiseInput.IsGarant = newFranchiseData.isGarant ?? false;
    createUpdateFranchiseInput.InvestInclude = JSON.stringify(this.aInvestInclude);
    createUpdateFranchiseInput.FinIndicators = JSON.stringify(this.aFinIndicators);
    createUpdateFranchiseInput.NameFinIndicators = newFranchiseData.nameFinIndicators;
    createUpdateFranchiseInput.FranchisePacks = JSON.stringify(this.aPacks);
    createUpdateFranchiseInput.IsNew = false;
    createUpdateFranchiseInput.Title = newFranchiseData.title;
    createUpdateFranchiseInput.TrainingDetails = newFranchiseData.trainingDetails;
    createUpdateFranchiseInput.Category = newFranchiseData.category;
    createUpdateFranchiseInput.SubCategory = newFranchiseData.subCategory;
    createUpdateFranchiseInput.FranchiseId = this.franchiseData.franchiseId;
    createUpdateFranchiseInput.UrlsFranchise = this.aNamesFranchisePhotos;

    let sendFormData = new FormData();
    sendFormData.append("franchiseDataInput", JSON.stringify(createUpdateFranchiseInput));
    sendFormData.append("filesLogo", this.fileLogoFormData);
    // sendFormData.append("urlsDetails", this.franchisePhotos);
    sendFormData.append("trainingPhoto", this.fileEducationFormData);
    sendFormData.append("finModelFile", this.modelFile);
    sendFormData.append("presentFile", this.presentFile);
    sendFormData.append("franchiseFile", this.presentFile);
    this.http.post(API_URL.apiUrl.concat("/configurator/create-update-franchise"), sendFormData)
      .subscribe((response: any) => {
        console.log("Франшиза успешно изменена:", response);
        this.showMessageAfterSuccessEditFranchise();
      }, (err) => {
        throw new Error(err);
      });
  };

  /**
   * Функция покажет сообщение об успешном изменении франшизы.
   */
  private showMessageAfterSuccessEditFranchise() {
    this.messageService.add({
      severity: 'success',
      summary: 'Успешно!',
      detail: 'Франшиза успешно изменена'
    });
  };

  private buildForm() {
    this.finDataForm = this.formBuilder.group({
      price: [this.finData.price, [Validators.required, sumValidator]],
      turnPrice: [this.finData.turnPrice, [Validators.required, sumValidator]],
      profitPrice: [this.finData.profitPrice, [Validators.required, sumValidator]],
      payback: [this.finData.payback, [Validators.required, sumValidator]],
      profitability: [this.finData.profitability, [Validators.required, sumValidator]],
      businessAge: [this.finData.businessAge, [Validators.required, sumValidator]]
    })

    this.finDataForm.valueChanges.subscribe(() => this.onValueChanged());
    //  this.createControls()
  }

  //   private createControls(): void {
  //     this.price = this.finDataForm.controls.price,
  //     this.turnPrice = this.finDataForm.controls.turnPrice,
  //     this.profitPrice = this.finDataForm.controls.profitPrice,
  //     this.payback = this.finDataForm.controls.payback,
  //     this.profitability = this.finDataForm.controls.profitability,
  //     this.businessAge = this.finDataForm.controls.businessAge
  //   }

  onValueChanged(): void {
    const form = this.finDataForm;
    Object.keys(this.finDataForm.value).forEach((key) => {
      this.finDataForm.value[key] = (String(this.finDataForm.value[key]).replace(/(\d)(?=(\d{3})+$)/g, '$1 '))
    });
    Object.keys(this.formErrors).forEach(field => {
      this.formErrors[field] = '';
      const control = form.get(field);
      if ((control?.dirty || control?.touched) && control.invalid) {
        const message = this.validationMessages[field];
        Object.keys(control.errors as any).some(key => this.formErrors[field] = message[key])
      }
    })
  }

  public uploadBusinessPhotosAsync(event: any) {
    let fileList = event.target.files;
    let formData: FormData = new FormData();

    for (let i = 0; i < fileList.length; i++) {
      formData.append('files', fileList[i]);
    }
    this.http.post(API_URL.apiUrl.concat("/configurator/temp-file"), formData)
      .subscribe((response: any) => {
        console.log("Загруженные файлы бизнеса:", response);
        this.aNamesBusinessPhotos = response;
      }, (err) => {
        throw new Error(err);
      });
  };

  /**
   * Функция создаст новый бизнес.
   * @returns - Данные созданного бизнеса.
   */
  public onCreateBusinessAsync() {
    console.log("onCreateBusinessAsync");

    let createUpdateBusinessInput = new CreateUpdateBusinessInput();
    let lead = this.lead;
    let payback = this.payback;
    let profitability = this.profitability;
    let activityDetail = this.activityDetail;
    let defailsFranchise = this.defailsFranchise;
    let priceIn = this.priceIn;
    let videoLink = this.videoLink;
    let isGarant = this.isGarant || false;
    let peculiarity = this.peculiarity;
    let businessName = this.businessName;
    let price = this.price;
    let turnPrice = this.turnPrice;
    let profitPrice = this.profitPrice;
    let businessAge = this.businessAge;
    let employeeYearCount = this.employeeYearCount;
    let form = this.form;
    let share = this.share;
    let site = this.site;
    let text = this.text;
    let assets = this.assets;
    let reasonsSale = this.reasonsSale;
    let address = this.address;

    // Если не добавляли записи и осталась лежать одна пустая.
    if (!this.aPriceIn[0].Name || !this.aPriceIn[0].Price) {
      this.aPriceIn[0].Name = this.nameIn;
      this.aPriceIn[0].Price = this.priceIn;
    } else {
      this.aPriceIn.push({Name: this.nameIn, Price: this.priceIn});
    }

    // Уберет пустые записи.
    this.aPriceIn = this.aPriceIn.filter((item: any) => item.Name !== "" && item.Price !== "");

    let aPriceInData = this.aPriceIn;
    let aNamesBusinessPhotos = this.aNamesBusinessPhotos;

    // Уберет флаги видимости.
    let newPriceInJson = aPriceInData.map((item: any) => ({Price: item.Price, Name: item.Name}));

    let priceInJson = JSON.stringify(newPriceInJson);

    createUpdateBusinessInput.Status = lead;
    createUpdateBusinessInput.Payback = payback;
    createUpdateBusinessInput.ActivityDetail = activityDetail;
    createUpdateBusinessInput.Peculiarity = peculiarity;
    createUpdateBusinessInput.Text = defailsFranchise;
    createUpdateBusinessInput.UrlVideo = videoLink;
    createUpdateBusinessInput.IsGarant = isGarant;
    createUpdateBusinessInput.IsNew = true;
    createUpdateBusinessInput.BusinessName = businessName;
    createUpdateBusinessInput.Price = price;
    createUpdateBusinessInput.TurnPrice = turnPrice;
    createUpdateBusinessInput.ProfitPrice = profitPrice;
    createUpdateBusinessInput.Profitability = profitability;
    createUpdateBusinessInput.BusinessAge = businessAge;
    createUpdateBusinessInput.EmployeeCountYear = employeeYearCount;
    createUpdateBusinessInput.Form = form;
    createUpdateBusinessInput.Share = share;
    createUpdateBusinessInput.Site = site;
    createUpdateBusinessInput.Text = text;
    createUpdateBusinessInput.Assets = assets;
    createUpdateBusinessInput.ReasonsSale = reasonsSale;
    createUpdateBusinessInput.Address = address;
    createUpdateBusinessInput.InvestPrice = priceInJson;
    createUpdateBusinessInput.UrlsBusiness = aNamesBusinessPhotos;
    createUpdateBusinessInput.Category = this.selectedCategory;
    createUpdateBusinessInput.SubCategory = this.selectedSubCategory;
    createUpdateBusinessInput.BusinessCity = this.selectedCityName;

    let sendFormData = new FormData();
    sendFormData.append("businessDataInput", JSON.stringify(createUpdateBusinessInput));
    sendFormData.append("filesAssets", this.filesAssets);
    sendFormData.append("filesReasonsSale", this.filesReasonsSale);
    sendFormData.append("finModelFile", this.modelFile);
    sendFormData.append("filesTextBusiness", this.filesTextBusiness);
    this.http.post(API_URL.apiUrl.concat("/configurator/create-update-business"), sendFormData)
      .subscribe((response: any) => {
        console.log("Бизнес успешно создан:", response);
        this.showMessageAfterSuccessCreateBusiness();

        setTimeout(() => {
          this.router.navigate(["/business/view"], {queryParams: {franchiseId: response.businessId, mode: "view"}});
        }, 2000);
      }, (err) => {
        throw new Error(err);
      });
  };

  /**
   * Функция добавит файл активов бизнеса.
   */
  public uploadAssetsBusinessPhotosAsync(event: any) {
    console.log("uploadAssetsBusinessPhotosAsync");
    this.filesAssetsCounter = event.target.files.length;
    this.filesAssets = event.target.files[0];
  };

  /**
   * Функция добавит файл причин продажи бизнеса.
   */
  public uploadReasonsSalePhotosAsync(event: any) {
    console.log("uploadReasonsSalePhotosAsync");
    this.filesReasonsSale = event.target.files[0];
  };

  /**
   * Функция добавит файл деятельности бизнеса.
   */
  public uploadTextBusinessPhotosAsync(event: any) {
    console.log("uploadTextBusinessPhotosAsync");
    this.filesTextBusiness = event.target.files[0];
  };

  /**
   * Функция покажет сообщение об успешном создании франшизы.
   */
  private showMessageAfterSuccessCreateBusiness() {
    this.messageService.add({severity: 'success', summary: 'Успешно!', detail: 'Бизнес успешно создан'});
  };

  /**
   * Функция нарастит блоки с данными входит в стоимость.
   * @param priceIn - цена.
   * @param nameIn - название.
   */
  public onAddPriceIn(priceIn: any, nameIn: any) {
    if (this.aPriceIn.length == 1) {
      this.aPriceIn[0] = {Name: nameIn, Price: priceIn};
      this.aPriceIn.push({Name: "", Price: ""});
      this.aPriceIn[this.ind].isHide = true;
      this.ind++;
      return;
    }
    this.aPriceIn[this.ind].Name = nameIn;
    this.aPriceIn[this.ind].Price = priceIn;
    this.aPriceIn.push({Name: "", Price: ""});
    this.aPriceIn[this.ind].isHide = true;
    this.ind++;
    console.log("aPriceIn", this.aPriceIn);
  };

  /**
   * Функция получит данные бизнеса, которые нужно изменить.
   * @returns - данные бизнеса.
   */
  private getEditBusinessAsync(businessId: number) {
    console.log("getEditBusinessAsync");
    this.http.get(API_URL.apiUrl.concat("/configurator/get-business?businessId=" + businessId))
      .subscribe((response: any) => {
        this.businessData = response;
        this.aPriceIn = JSON.parse(response.investPrice);

        // Запишет пути изображений бизнеса.
        // this.businessData.forEach((item: any) => {
        //     this.aNamesBusinessPhotos = item.urlsBusiness;
        // });

        // this.businessData.urlsBusiness.forEach((item: any) => {
        //     this.aNamesBusinessPhotos = item.urlsBusiness;
        // });

        console.log("Полученный бизнес:", response);
        console.log("businessData", this.businessData);
        console.log("aPriceIn", this.aPriceIn);
        console.log("aBusinessPhotos", this.aNamesBusinessPhotos);
      }, (err) => {
        this.commonService.routeToStart(err);
        throw new Error(err);
      });
  };

  /**
   * Функция изменит бизнес.
   * @returns - Данные бизнеса.
   */
  public onEditBusinessAsync() {
    console.log("onEditBusinessAsync");
    let createUpdateBusinessInput = new CreateUpdateBusinessInput();
    let newBusinessData = this.businessData;
    let lead = newBusinessData.status;
    let payback = newBusinessData.payback;
    let profitability = newBusinessData.profitability;
    let activityDetail = newBusinessData.activityDetail;
    let defailsFranchise = newBusinessData.defailsFranchise;
    let priceIn = newBusinessData.priceIn;
    let videoLink = newBusinessData.urlVideo;
    let isGarant = newBusinessData.isGarant || false;
    let peculiarity = newBusinessData.peculiarity;
    let businessName = newBusinessData.businessName;
    let price = +newBusinessData.price;
    let turnPrice = newBusinessData.turnPrice;
    let profitPrice = newBusinessData.profitPrice;
    let businessAge = newBusinessData.businessAge;
    let employeeYearCount = newBusinessData.employeeCountYear;
    let form = newBusinessData.form;
    let share = newBusinessData.share;
    let site = newBusinessData.site;
    let text = newBusinessData.text;
    let assets = newBusinessData.assets;
    let reasonsSale = newBusinessData.reasonsSale;
    let address = newBusinessData.address;
    // let aPriceInData = JSON.parse(this.aPriceIn);
    let aNamesBusinessPhotos = this.aNamesBusinessPhotos;

    // Уберет флаги видимости.
    let newPriceInJson = this.aPriceIn.map((item: any) => ({
      Price: item.Price,
      Name: item.Name
    }));

    let priceInJson = JSON.stringify(newPriceInJson);

    createUpdateBusinessInput.Status = lead;
    createUpdateBusinessInput.Payback = payback;
    createUpdateBusinessInput.ActivityDetail = activityDetail;
    createUpdateBusinessInput.Peculiarity = peculiarity;
    createUpdateBusinessInput.Text = defailsFranchise;
    createUpdateBusinessInput.UrlVideo = videoLink;
    createUpdateBusinessInput.IsGarant = isGarant;
    createUpdateBusinessInput.IsNew = false;
    createUpdateBusinessInput.BusinessName = businessName;
    createUpdateBusinessInput.Price = price;
    createUpdateBusinessInput.TurnPrice = turnPrice;
    createUpdateBusinessInput.ProfitPrice = profitPrice;
    createUpdateBusinessInput.Profitability = profitability;
    createUpdateBusinessInput.BusinessAge = businessAge;
    createUpdateBusinessInput.EmployeeCountYear = employeeYearCount;
    createUpdateBusinessInput.Form = form;
    createUpdateBusinessInput.Share = share;
    createUpdateBusinessInput.Site = site;
    createUpdateBusinessInput.Text = text;
    createUpdateBusinessInput.Assets = assets;
    createUpdateBusinessInput.ReasonsSale = reasonsSale;
    createUpdateBusinessInput.Address = address;
    createUpdateBusinessInput.InvestPrice = priceInJson;
    createUpdateBusinessInput.UrlsBusiness = aNamesBusinessPhotos;
    createUpdateBusinessInput.Category = newBusinessData.category;
    createUpdateBusinessInput.SubCategory = newBusinessData.subCategory;

    let sendFormData = new FormData();
    sendFormData.append("businessDataInput", JSON.stringify(createUpdateBusinessInput));
    sendFormData.append("filesAssets", this.filesAssets);
    sendFormData.append("filesReasonsSale", this.filesReasonsSale);
    sendFormData.append("finModelFile", this.modelFile);
    sendFormData.append("filesTextBusiness", this.filesTextBusiness);

    this.http.post(API_URL.apiUrl.concat("/business/create-update-business"), sendFormData)
      .subscribe((response: any) => {
        console.log("Бизнес успешно изменен:", response);
        this.showMessageAfterSuccessCreateBusiness();
      }, (err) => {
        this.commonService.routeToStart(err);
        throw new Error(err);
      });
  };

  private getEditBlogArticleAsync(articleId: number) {
    if (+this.selectedBlogArticleId > 0 && !this.isNew) {
      this.http.get(API_URL.apiUrl.concat("/blog/get-article?articleId=" + articleId))
        .subscribe((response: any) => {
          console.log("Статья для изменения: ", response);
          this.oEditArticle = response;
          this.articleTitle = response.title;
          this.shortArticleDescription = response.description;
          this.articleDescription = response.text;
          this.signature = response.signatureText;
        });
    }
  };

  public onEditArticleAsync(selectedBlogId: number, selectedTheme: any, articleTitle: string, shortArticleDescription: string, articleDescription: string, signature: string) {
    let formData = new FormData();
    formData.append("previewFile", this.previewFile);
    formData.append("articleFile", this.articleFile);

    let articleInput = new ArticleInput();
    articleInput.Title = articleTitle;
    articleInput.BlogId = selectedBlogId;
    articleInput.ThemeCode = this.selectedTheme;
    articleInput.Description = shortArticleDescription;
    articleInput.Text = articleDescription;
    articleInput.SignatureText = signature;

    formData.append("articleData", JSON.stringify(articleInput));
    this.http.post(API_URL.apiUrl.concat("/blog/update-article"), formData)
      .subscribe((response: any) => {
        console.log(response);
      });
  };

  // TODO: вынести в общий сервис.
  private getBlogArticlesAsync(blogId: number) {
    let articleInput = new ArticleInput();
    articleInput.BlogId = blogId;

    this.http.post(API_URL.apiUrl.concat("/blog/get-blog-articles"), articleInput)
      .subscribe((response: any) => {
        console.log("aBlogArticles", response);
        this.aBlogArticles = response;
      });
  };

  public onCreateNewsAsync() {
    let newsInput = new NewsInput();
    let formData = new FormData();
    newsInput.Title = this.newsTitle;
    newsInput.Text = this.textNews;
    newsInput.Type = this.typeNews;

    formData.append("images", this.newsFile);
    formData.append("newsData", JSON.stringify(newsInput));

    this.http.post(API_URL.apiUrl.concat("/blog/create-new"), formData)
      .subscribe((response: any) => {
        console.log("Созданая новость", response);
        this.oNews = response;
      });
  };

  private getEditNewsAsync(newsId: number) {
    this.http.get(API_URL.apiUrl.concat("/blog/get-new?newsId=" + newsId))
      .subscribe((response: any) => {
        console.log("Новость для изменения: ", response);
        this.newsTitle = response.title;
        this.typeNews = response.type;
        this.textNews = response.text;
      });
  };

  public onEditNewsAsync() {

  };

  private getNewsAsync() {
    this.http.post(API_URL.apiUrl.concat("/blog/get-news"), {})
      .subscribe((response: any) => {
        console.log("Список новостей: ", response);
        this.aNews = response;
      });
  };

  /**
   * Функция получит список франшиз, которые ожидают согласования.
   * @returns - Список франшиз.
   */
  private getNotAcceptedFranchisesAsync() {
    this.http.post(API_URL.apiUrl.concat("/configurator/franchises-not-accepted"), {})
      .pipe(tap((response) => {
        console.log("Список франшиз ожидающих согласования: ", response);
        this.aNotAcceptedFranchises = response as any;
      }), catchError(err => of(new Error(err))));
  };

  public onViewFranchise(index: number) {
    console.log("index", this.aNotAcceptedFranchises[index].franchiseId);
    this.router.navigate(["/franchise/view"], {
      queryParams: {
        franchiseId: this.aNotAcceptedFranchises[index].franchiseId,
        mode: "view"
      }
    });
  };

  public onViewBusiness(index: number) {
    console.log("index", this.notAcceptedBusinesses$.value[index].businessId);
    this.router.navigate(["/business/view"], {
      queryParams: {
        businessId: this.notAcceptedBusinesses$.value[index].businessId,
        mode: "view"
      }
    });
  };

  /**
   * Функция одобрит карточку. Далее карточка попадет в каталоги.
   * @param cardId - Id карточки.
   * @param cardType - Тип карточки.
   * @returns - Статус одобрения.
   */
  public onAcceptCardAsync(cardId: number, cardType: string) {
    this.http.get(API_URL.apiUrl.concat("/configurator/accept-card?cardId=" + cardId + "&cardType=" + cardType))
      .subscribe((response: any) => {
          console.log("Одобрение карточки: ", response);
          if (cardType == "Franchise") {
            this.getNotAcceptedFranchisesAsync();
          }
          if (cardType == "Business") {
            this.configuratorService.getNotAcceptedBusinesses().subscribe();
          }
          this.messageService.add({severity: 'success', summary: 'Успешно', detail: 'Карточка успешно одобрена'});
        },
        (err) => {
          this.messageService.add({severity: 'error', summary: 'Ошибка', detail: 'Ошибка при одобрении карточки'});
          throw new Error(err);
        });
  };

  public onShowRejectFranchiseModal(index: number) {
    this.isShowRejectFranchiseModal = true;
    this.selectedRowIndexFranchise = index;
  };

  public onShowRejectBusinessModal(index: number) {
    this.isShowRejectBusinessModal = true;
    this.selectedRowIndexFranchise = index;
  };

  /**
   * Функция отклонит карточку франшизы.
   * @param cardType
   */
  public onRejectFranchiseCardAsync(cardType: string) {
    let i = this.selectedRowIndexFranchise;

    this.configuratorService.onRejectCardAsync(this.aNotAcceptedFranchises[i].franchiseId, cardType, this.commentRejected).subscribe(async (response: any) => {
      if (response) {
        this.messageService.add({severity: 'success', summary: 'Успешно', detail: 'Карточка успешно отклонена'});
        this.getNotAcceptedFranchisesAsync();
        this.isShowRejectFranchiseModal = false;
      }
    });
  };

  public onRejectBusinessCardAsync(cardType: string) {
    let i = this.selectedRowIndexBusiness;
    this.configuratorService.onRejectCardAsync(this.notAcceptedBusinesses$.value[i].businessId, cardType, this.commentRejected).subscribe((response: any) => {
      if (response) {
        this.messageService.add({severity: 'success', summary: 'Успешно', detail: 'Карточка успешно отклонена'});
        this.configuratorService.getNotAcceptedBusinesses().subscribe();
        this.isShowRejectBusinessModal = false;
      }
    });
  };

  /**
   * Функция получит список бизнесов, которые ожидают согласования.
   * @returns - Список бизнесов.
   */
  //  private  getNotAcceptedBusinessesAsync() {
  //     try {
  //         this.http.post(API_URL.apiUrl.concat("/configurator/businesses-not-accepted"), {})
  //         .subscribe({
  //             next: (response: any) => {
  //                 console.log("Список бизнесов ожидающих согласования: ", response);
  //                 this.aNotAcceptedBusinesses = response;
  //             },

  //             error: (err) => {
  //                 throw new Error(err);
  //             }
  //         });
  //     }

  //     catch (e: any) {
  //         throw new Error(e);
  //     }
  // };

  public ngOnDestroy(): void {
    this.unsub$.next();
  };

  private GetFranchiseCategoriesListAsync() {
    this.commonService.GetFranchiseCategoriesListAsync().subscribe((data: any) => {
      console.log("Список категорий франшиз:", data);
      this.aFranchiseCategories = data;
    });
  };

  public getBusinessDataAsync() {
    this.commonService.GetBusinessCategoriesListAsync().subscribe((data: any) => {
      console.log("Список категорий бизнеса:", data);
      this.aBusinessCategories = data;
    });

    this.commonService.GetBusinessSubCategoriesListAsync().subscribe((data: any) => {
      console.log("Список подкатегорий бизнеса:", data);
      this.aBusinessSubCategories = data;
    });
  };

  public onChangeValueSphereAsync(categoryCode: string, categorySysName: string) {
    this.commonService.GetFranchiseSubCategoriesListAsync(categoryCode, categorySysName).subscribe((data: any) => {
      console.log("Список подкатегорий сферы:", data);
      this.aFranchiseSubCategories = data;
    });
  };

  /**
   * Функция фильтрует список сфер в зависимости от поискового запроса.
   * @param searchText - Поисковый запрос.
   * @returns - Список сфер.
   */
  public onFilterSphereAsync(searchText: string) {
    this.http.get(API_URL.apiUrl.concat("/franchise/search-sphere?searchText=" + searchText))
      .pipe(tap((response) => console.log("Список сфер :", response)));
  };

  public onFilterCategoryAsync(searchText: string, categoryCode: string, categorySysName: string) {
    this.http.get(API_URL.apiUrl.concat(`/franchise/search-category?searchText=${searchText}&categoryCode=${categoryCode}&categorySysName=${categorySysName}`))
      .pipe(tap((response) => console.log("Список категорий сферы :", response)));
  };

  private getCitiesAsync() {
    this.commonService.GetBusinessCitiesListAsync().subscribe((data: any) => {
      console.log("Список городов бизнеса:", data);
      this.aCities = data;
    });
  };

  public onSelectSphereCategory(e: any, flag: boolean) {
    console.log(e);
    console.log("sphereActionName", this.sphereAction);
  };

  public onCreateSphereAsync(sphereName: string, sphereType: string, sysName: string) {
    this.configuratorService.createSphereAsync(sphereName, sphereType, sysName).subscribe((data: any) => console.log("Созданная сфера: ", data));
  };

  public onCreateCategoryAsync(category: any, sphereName: string, sphereType: string, sysName: string) {
    console.log(category);
    this.configuratorService.createCategoryAsync(category.categoryCode, sphereName, sphereType, sysName).subscribe((data: any) => console.log("Созданная категория: ", data));
  };
}