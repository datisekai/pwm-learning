import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import PermissionAction from "../../../actions/Permission.action";
import { ActionModel } from "../../../models/Action.model";
import { PermissionModel } from "../../../models/Permission.model";
import { AuthContext } from "../../context";

interface FunctionAdminProps {
  permissions: PermissionModel[];
  data: ActionModel[];
}

const FunctionAdmin: React.FC<FunctionAdminProps> = ({ data, permissions }) => {
  const [detailActions, setDetailActions] = useState<number[]>([]);
  const [permissionId, setPermissionId] = useState(permissions[0].id);

  console.log(data)

  useEffect(() => {
    const currentPermission = permissions.find(
      (item) => item.id === permissionId
    );
    const checkeds = currentPermission?.perdetailactions?.map(
      (item) => item.detailActionId
    );
    setDetailActions(checkeds || []);
  }, [permissionId]);

  const router = useRouter();

  const { mutate, isLoading } = useMutation(PermissionAction.setPermission, {
    onSuccess: () => {
      toast.success("Gán quyền thành công");
      router.replace(router.asPath);
    },
    onError: () => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
      router.replace(router.asPath);
    },
  });

  const handleSubmit = () => {
    mutate({ id: permissionId, detailActions });
  };

  const handleCheckAll = (checked: boolean) => {
    if (!checked) {
      setDetailActions([]);
    } else {
      const checks = data.reduce((pre: number[], cur) => {
        const currentDetail = cur.detailactions.map((item) => item.id);
        return [...pre, ...currentDetail];
      }, []);
      setDetailActions(checks);
    }
  };
  const handleIsCheckOneBox = (actions: ActionModel) => {
    const currentActions = actions.detailactions.map((item) => item.id);
    let flag = true;

    currentActions.forEach((item) => {
      if (!detailActions.includes(item)) {
        flag = false;
      }
    });

    return flag;
  };

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.detailActions.includes("permission:update")) {
      router.push("/admin");
    }
  }, [user]);

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-white bg-primary px-4 py-2 inline rounded-lg">
          Gán quyền
        </h1>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <input
              id="checked-checkbox"
              type="checkbox"
              checked={
                detailActions.length ===
                data.reduce((pre: number[], cur) => {
                  const currentDetail = cur.detailactions.map(
                    (item) => item.id
                  );
                  return [...pre, ...currentDetail];
                }, []).length
              }
              onChange={(e) => handleCheckAll(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="checked-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Tất cả
            </label>
          </div>

          <div className="w-[150px]">
            <select
              onChange={(e) => setPermissionId(Number(e.target.value))}
              defaultValue={permissions[0].id}
              className="css-field"
            >
              {permissions?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="mt-10 bg-white dark:bg-black  grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
        {data?.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-3xl"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold">{item.name}</h3>
              <div className="flex items-center">
                <input
                  id="checked-checkbox"
                  type="checkbox"
                  checked={handleIsCheckOneBox(item)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const currentDetailActions = item.detailactions.map(
                        (element) => element.id
                      );
                      const current = [...detailActions];
                      currentDetailActions.forEach((element) => {
                        if (!current.some((d) => d === element)) {
                          current.push(element);
                        }
                      });
                      setDetailActions(current);
                    } else {
                      const currentDetailActions = item.detailactions.map(
                        (element) => element.id
                      );
                      let current = [...detailActions];
                      currentDetailActions.forEach((element) => {
                        current = current.filter((d) => d !== element);
                      });
                      setDetailActions(current);
                    }
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="checked-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Tất cả
                </label>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-y-2">
              {item.detailactions.map((element) => (
                <label
                  key={element.id}
                  className="relative inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    defaultValue=""
                    className="sr-only peer"
                    checked={detailActions.includes(element.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDetailActions([...detailActions, element.id]);
                      } else {
                        setDetailActions(
                          detailActions.filter((d) => d !== element.id)
                        );
                      }
                    }}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {element.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="pb-10 mt-6 flex justify-end">
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className="px-4 py-2 w-[150px] bg-primary hover:bg-primaryHover text-white rounded-md"
        >
          Lưu quyền
        </button>
      </div>
    </div>
  );
};

export default FunctionAdmin;
