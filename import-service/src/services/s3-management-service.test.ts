import S3 from "aws-sdk/clients/s3";
import { S3ManagementService } from "@services/s3-management-service";

describe("S3ManagementService", () => {
  const PARAMS = {
    bucketName: "bucket-name",
    s3: {} as S3,
  };

  let s3ManagementService = null;

  beforeEach(() => {
    s3ManagementService = new S3ManagementService(PARAMS.bucketName, PARAMS.s3);

    s3ManagementService.generateSignedUrl = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve("signed-url"));

    s3ManagementService.moveFiles = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve([]));
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
    jest.clearAllMocks();

    s3ManagementService = null;
  });

  it("generateSignedUrl runs correctly", async () => {
    const result = await s3ManagementService.generateSignedUrl("");
    0;
    expect(result).toBe("signed-url");
  });

  it("moveFiles runs correctly", async () => {
    const result = await s3ManagementService.moveFiles(["1", "2", "3"]);

    expect(result).toMatchObject([]);
  });
});
