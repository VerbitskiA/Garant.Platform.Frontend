import {HttpClient} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {API_URL} from "src/app/core/core-urls/api-url";
import {CreateUpdateBusinessInput} from "src/app/models/business/input/business-create-update-input";
import {CommonDataService} from "src/app/core/services/common/common-data.service";
import {FORM_ERRORS, FORM_PLACEHOLDERS, FORM_SUCCESS, FORM_VALIDATION_MESSAGES} from 'src/app/shared/classes/form-data';

@Component({
  selector: "app-create-ready-business",
  templateUrl: "./create-ready-business.component.html",
  styleUrls: ["./create-ready-business.component.scss"]
})

/**
 * Класс модуля создания бизнеса.
 */
export class CreateReadyBusinessComponent implements OnInit {
  responsiveOptions: any;
  aNamesBusinessPhotos: any = [];
  lead: string = "";
  payback: number = 0;
  peculiarity: string = "";
  isGarant: boolean = false;
  activityDetail: string = "";
  defailsFranchise: string = "";
  priceIn: number = 0;
  nameIn = "";
  videoLink: string = "";
  modelFile: any;
  ind: number = 0;
  fio: string = "";
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
  routeParamCategory: any;
  routeParamSubCategory: any;
  routeParamCity: any;

  // formLabels = FORM_LABELS;
  formPlaceholders = FORM_PLACEHOLDERS;
  formSuccess = FORM_SUCCESS;
  formErrors: any = FORM_ERRORS;
  validationMessages: any = FORM_VALIDATION_MESSAGES;


  constructor(private http: HttpClient,
              private commonService: CommonDataService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) {
    this.responsiveOptions = [
      {breakpoint: '1024px', numVisible: 5},
      {breakpoint: '768px', numVisible: 3},
      {breakpoint: '560px', numVisible: 1}
    ];

    // Первоначальная инициализация входит в стоимость.
    this.aPriceIn = [{Name: "", Price: "", isHide: false}];

    this.routeParamCategory = this.route.snapshot.queryParams["category"];
    this.routeParamSubCategory = this.route.snapshot.queryParams["subCategory"];
    this.routeParamCity = this.route.snapshot.queryParams["city"];

    console.log("aPriceIn", this.aPriceIn);
  };

  public ngOnInit() {
    //   this.buildForm();
    this.getUserFio();
  };


  public uploadBusinessPhotosAsync(event: any) {
    let fileList = event.target.files;
    let formData: FormData = new FormData();

    for (let i = 0; i < fileList.length; i++) {
      formData.append('files', fileList[i]);
    }

    this.http.post(API_URL.apiUrl.concat("/business/temp-file"), formData)
      .subscribe((response: any) => this.aNamesBusinessPhotos = response, (err) => {
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
    createUpdateBusinessInput.Category = this.routeParamCategory;
    createUpdateBusinessInput.SubCategory = this.routeParamSubCategory;

    let sendFormData = new FormData();
    sendFormData.append("businessDataInput", JSON.stringify(createUpdateBusinessInput));
    sendFormData.append("filesAssets", this.filesAssets);
    sendFormData.append("filesReasonsSale", this.filesReasonsSale);
    sendFormData.append("finModelFile", this.modelFile);
    sendFormData.append("filesTextBusiness", this.filesTextBusiness);

    this.http.post(API_URL.apiUrl.concat("/business/create-update-business"), sendFormData)
      .subscribe((response: any) => {
        console.log("Бизнес успешно создан:", response);
        this.showMessageAfterSuccessCreateBusiness();

        setTimeout(() => {
          this.router.navigate(["/business/view"], {queryParams: {businessId: response.businessId, mode: "view"}});
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
   * Функция добавит файл фин.модели.
   */
  public uploadFinModelAsync(event: any) {
    console.log("uploadFinModelAsync");
    this.modelFile = event.target.files[0];
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
    this.messageService.add({
      severity: 'success',
      summary: 'Успешно!',
      detail: 'Бизнес успешно создан'
    });
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

  public onCheckedGarant() {
    console.log("isGarant", this.isGarant);
  };

  private getUserFio() {
    this.http.post(API_URL.apiUrl.concat("/user/user-fio"), {})
      .subscribe((response: any) => this.fio = response.fullName, (err) => {
        this.commonService.routeToStart(err);
        throw new Error(err);
      });
  };
}
