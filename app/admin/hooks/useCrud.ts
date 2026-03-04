import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type CrudConfig<T> = {
    queryKey: string[];
    getFn: () => Promise<T[]>;
    createFn: (data: any) => Promise<any>;
    updateFn: (id: string, data: any) => Promise<any>;
    deleteFn: (id: string) => Promise<any>;
    successMessages: {
        create: string;
        update: string;
        delete: string;
    };
    initialData: T[];
};

export function useCrud<T>(config: CrudConfig<T>) {
    const queryClient = useQueryClient();

    const { data = config.initialData } = useQuery({
        queryKey: config.queryKey,
        queryFn: config.getFn,
        initialData: config.initialData,
    });

    const createMut = useMutation({
        mutationFn: config.createFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: config.queryKey });
            toast.success(config.successMessages.create);
        },
        onError: () => toast.error("Error"),
    });

    const updateMut = useMutation({
        mutationFn: ({ id, data }: any) =>
            config.updateFn(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: config.queryKey });
            toast.success(config.successMessages.update);
        },
        onError: () => toast.error("Error"),
    });

    const deleteMut = useMutation({
        mutationFn: config.deleteFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: config.queryKey });
            toast.success(config.successMessages.delete);
        },
        onError: () => toast.error("Error"),
    });

    return { data, createMut, updateMut, deleteMut };
}
